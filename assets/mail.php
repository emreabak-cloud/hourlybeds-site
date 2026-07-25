<?php
// Include PHPMailer classes manually
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 1. Formdan Gelen Verileri Yakalıyoruz
    $name         = isset($_POST["name"])         ? trim($_POST["name"])         : "";
    $email        = isset($_POST["email"])        ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : "";
    $phone        = isset($_POST["phone"])        ? trim($_POST["phone"])        : "";
    $hotel_name   = isset($_POST["hotel_name"])   ? trim($_POST["hotel_name"])   : "Belirtilmedi";
    $checkin_time = isset($_POST["checkin_time"]) ? trim($_POST["checkin_time"]) : "Belirtilmedi";
    $duration     = isset($_POST["duration"])     ? trim($_POST["duration"])     : "Belirtilmedi";
    $total_price  = isset($_POST["total_price"])  ? trim($_POST["total_price"])  : "Belirtilmedi";
    $message      = isset($_POST["message"])      ? trim($_POST["message"])      : "";

    // 🎯 Otelden Gelen Mail Adresleri (Tekli veya Virgüllü Çoklu)
    $hotel_email  = isset($_POST["hotel_email"])  ? trim($_POST["hotel_email"])  : "";

    if (empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Lütfen gerekli alanları eksiksiz doldurun.";
        exit;
    }

    $admin_email = "info@hourlybeds.com"; 

    // HTML Mail İçeriği
    $email_content = "
    <html>
    <head><title>Yeni Saatlik Rezervasyon Talebi</title></head>
    <body style='font-family: Arial, sans-serif; color: #333;'>
        <div style='background-color: #f4f4f4; padding: 20px; border-radius: 8px;'>
            <h2 style='color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px;'>HourlyBeds Yeni Rezervasyon Bildirimi</h2>
            <h3>Otel Bilgileri</h3>
            <p><strong>Otel Adı:</strong> {$hotel_name}</p>
            <h3>Misafir Bilgileri</h3>
            <p><strong>Adı Soyadı:</strong> {$name}</p>
            <p><strong>E-posta:</strong> {$email}</p>
            <p><strong>Telefon:</strong> {$phone}</p>
            <h3>Konaklama Detayları</h3>
            <p><strong>Giriş Saati:</strong> {$checkin_time}</p>
            <p><strong>Konaklama Süresi:</strong> {$duration}</p>
            <p><strong>Toplam Tutar:</strong> {$total_price} TL</p>
            <p><strong>Not/Mesaj:</strong><br>".nl2br($message)."</p>
            <hr style='border: 0; border-top: 1px solid #ccc; margin-top: 20px;'>
            <p style='font-size: 11px; color: #777;'>Bu bildirim HourlyBeds.com Otomatik Rezervasyon Sistemi tarafından oluşturulmuştur.</p>
        </div>
    </body>
    </html>
    ";

    $mail = new PHPMailer(true);

    try {
        // Server Ayarları
        $mail->isSMTP();
        $mail->Host       = 'mail.kurumsaleposta.com'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@tourquaz.com'; 
        $mail->Password   = 'GGgg040310059&@'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465; 
        $mail->CharSet    = 'UTF-8'; 

        $mail->setFrom('info@tourquaz.com', 'HourlyBeds Rezervasyon');

        // =======================================================
        // 🚀 ALICILAR (ÇOKLU OTEL MAİLİ DESTEKLİ)
        // =======================================================
        
        // 1. Sana (Admin) Mail
        $mail->addAddress($admin_email); 

        // 2. Müşteriye Onay Maili
        $mail->addAddress($email, $name); 

        // 3. Otel Mailleri (Virgülle Ayrılmış Birden Fazla Maili Parçalar)
        if (!empty($hotel_email)) {
            // Mailleri virgüle göre ayırıp dizi yapıyoruz
            $emails_list = explode(',', $hotel_email); 
            
            foreach ($emails_list as $single_email) {
                $clean_email = filter_var(trim($single_email), FILTER_SANITIZE_EMAIL);
                if (filter_var($clean_email, FILTER_VALIDATE_EMAIL)) {
                    $mail->addAddress($clean_email); // Geçerli olan her otel mailine ayrı ayrı ekler
                }
            }
        }

        $mail->addReplyTo($email, $name); 

        // İçerik Ayarları
        $mail->isHTML(true);
        $mail->Subject = "Yeni Rezervasyon: {$hotel_name} - {$name}";
        $mail->Body    = $email_content;
        $mail->AltBody = strip_tags($email_content);

        $mail->send();

        http_response_code(200);
        echo "Rezervasyon talebiniz başarıyla alındı!";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Mesaj gönderilemedi. Hata: {$mail->ErrorInfo}";
    }

} else {
    http_response_code(403);
    echo "Form gönderiminde bir sorun oluştu, lütfen tekrar deneyin.";
}
?>
<?php
// Include PHPMailer classes manually
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name     = isset($_POST["name"])     ? trim($_POST["name"])     : "";
    $message  = isset($_POST["message"])  ? trim($_POST["message"])  : "";
    $subject  = isset($_POST["subject"])  ? trim($_POST["subject"])  : "Yeni İletişim Mesajı"; // HTML formundaki 'subject' alanı eklendi
    $email    = isset($_POST["email"]) ? filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL) : "";

    // KONTROL: Senin formunda 'website' yok, 'subject' var. Bu yüzden validation güncellendi.
    if ( empty($name) OR empty($subject) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Lütfen formu eksiksiz doldurun ve tekrar deneyin.";
        exit;
    }

    // Alıcı Adresi (Maillerin gelmesini istediğin kendi e-posta adresin)
    $recipient = "seninmailadresin@gmail.com"; 

    // HTML E-posta İçeriği
    $email_content = "
    <html>
    <head>
        <title>Yeni İletişim Formu Mesajı</title>
    </head>
    <body style='font-family: Arial, sans-serif;'>
        <h2 style='color:#333;'>Siteden Yeni Destek Talebi</h2>
        <p><strong>Adı Soyadı:</strong> {$name}</p>
        <p><strong>E-posta:</strong> {$email}</p>
        <p><strong>Konu:</strong> {$subject}</p>
        <p><strong>Mesaj:</strong><br>".nl2br($message)."</p>
        <hr>
        <p style='font-size:12px;color:#999;'>Bu e-posta Ankara Saatlik Oteller web sitesi iletişim formundan gönderilmiştir.</p>
    </body>
    </html>
    ";

    $mail = new PHPMailer(true);

    try {
        // Server Ayarları (Burayı hosting bilgilerine göre doldurmalısın)
        $mail->isSMTP();
        $mail->Host       = 'mail.kurumsaleposta.com';      // Hosting şirketinin SMTP sunucusu (Örn: mail.kurumsal.com)
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@tourquaz.com';     // Web sitene ait resmi mail adresi
        $mail->Password   = 'GGgg040310059&@';          // Bu mail adresinin şifresi
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;                             // SSL için 465, TLS kullanacaksanız 587 yapın
        $mail->CharSet    = 'UTF-8';                         // Türkçe karakter hatası olmaması için eklendi

        // Alıcılar
        $mail->setFrom('info@tourquaz.com', 'Saatlik Oteller İletişim Formu');
        $mail->addAddress($recipient); 
        $mail->addReplyTo($email, $name); // Yanıtla dediğinde formu dolduran kişiye gitsin

        // İçerik
        $mail->isHTML(true);
        $mail->Subject = "İletişim Formu: $subject"; // Hatalı olan $service değişkeni $subject ile düzeltildi
        $mail->Body    = $email_content;
        $mail->AltBody = strip_tags($email_content);

        $mail->send();

        http_response_code(200);
        echo "Mesajınız başarıyla gönderildi. Teşekkür ederiz!";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Mesaj gönderilemedi. Hata: {$mail->ErrorInfo}";
    }

} else {
    http_response_code(403);
    echo "Form gönderiminde bir sorun oluştu, lütfen tekrar deneyin.";
}
?>
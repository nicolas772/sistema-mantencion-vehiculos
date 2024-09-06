<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use MailerSend\Helpers\Builder\Personalization;
use MailerSend\LaravelDriver\MailerSendTrait;

class ImportNotificationMail extends Mailable
{
    use Queueable, SerializesModels, MailerSendTrait;

    public $fileName;
    public $ownersCreated;
    public $vehiclesCreated;

    public function __construct($fileName, $ownersCreated, $vehiclesCreated)
    {
        $this->fileName = $fileName;
        $this->ownersCreated = $ownersCreated;
        $this->vehiclesCreated = $vehiclesCreated;
    }

    public function build()
    {
        $to = Arr::get($this->to, '0.address');

        return $this
            ->view('emails.import_notification')
            ->text('emails.import_notification_text')
            ->mailersend(
                template_id: null,
                tags: ['tag'],
                personalization: [
                    new Personalization($to, [
                        'fileName' => $this->fileName,
                        'ownersCreated' => $this->ownersCreated,
                        'vehiclesCreated' => $this->vehiclesCreated,
                    ])
                ],
                precedenceBulkHeader: true
            );
    }
}


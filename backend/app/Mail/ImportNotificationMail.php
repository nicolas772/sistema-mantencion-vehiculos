<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ImportNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

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
        return $this->view('emails.import_notification')
                    ->with([
                        'fileName' => $this->fileName,
                        'ownersCreated' => $this->ownersCreated,
                        'vehiclesCreated' => $this->vehiclesCreated,
                    ]);
    }
}

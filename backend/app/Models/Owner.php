<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'last_name', 'email'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'owner_id');
    }

    public function ownershipHistories()
    {
        return $this->hasMany(VehicleOwnershipHistory::class);
    }
}

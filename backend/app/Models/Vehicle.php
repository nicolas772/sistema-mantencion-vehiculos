<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $fillable = ['brand', 'model', 'license_plate', 'year', 'owner_id', 'price'];

    public function owner()
    {
        return $this->belongsTo(Owner::class, 'owner_id');
    }

    public function ownershipHistories()
    {
        return $this->hasMany(VehicleOwnershipHistory::class);
    }
}

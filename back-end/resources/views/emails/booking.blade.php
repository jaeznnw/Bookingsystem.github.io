<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body>
    <h2 style="font-weight: bold;">Thank you for booking with us <span style="color:#caac02;">{{$booking->profile->first_name}} {{$booking->profile->last_name}}</span>!</h2>
    <ul>
        <li>
            <h4>Room Name: <span style="color:#0096FF">{{$booking->rooms->typeOfRooms->name}}</span></h4>
        </li>
        <li>
            <h4>Room Number: <span style="color:#0096FF">{{$booking->rooms->room_number}}</span></h4>
        </li>
        <li>
            <h4>Price per Hour: <span style="color:#0096FF">{{$booking->rooms->typeOfRooms->prices_per_hour}}</span></h4>
        </li>
        <li>
            <h4>Payment: <span style="color: #0096FF">{{$booking->payment_type_name}}</span></h4>
        </li>
        <li>
            <h4>Payment Status: <span style="color:#0096FF">{{$booking->payment_status_name}}</span></h4>
        </li>
        <li>
            <h4>Check-in Date: <span style="color:#0096FF">{{$booking->check_in_date}}</span></h4>
        </li>
        <li>
            <h4>Check-out Date: <span style="color:#0096FF">{{$booking->check_out_date}}</span></h4>
        </li>
    </ul>
    <p>If you need any assistance, please feel free to <a href="mailto:estonantojae@gmail.com">contact me</a>.</p>
    <p>
        Your sweet home, <br>
        Staycation to Heaven
    </p>
</body>
</html>

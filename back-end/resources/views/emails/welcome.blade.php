<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Staycation-Hotel</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        h2 {
            color: #2c3e50;
        }
        p {
            margin: 0 0 10px;
        }
        .footer {
            margin-top: 20px;
            font-size: 0.9em;
            color: #999;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 10px;
            background-color: #ffffff;
            color: #070707;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #ffffff;
        }
        .image {
            text-align: center;
            margin-top: 20px;
        }
        .image img {
            max-width: 100%;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Welcome to Staycation-Hotel, {{ $user->name }}!</h2>
      
        <p>Thank you for registering!   We're so excited to have you here with us!</p>

        <p>If you need any assistance, feel free to <a href="mailto:estonantojae@gmail.com" class="button">Contact Us</a>.</p>

       

        <p>
            Your sweet home, Staycation to Heaven
        </p>
        
        <p class="footer">
            &copy; 2024 Staycation-Hotel. All rights reserved.
        </p>
    </div>
</body>
</html>

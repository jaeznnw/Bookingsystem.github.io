<!DOCTYPE html>
<html>
<head>
    <title>Contact Message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h4 {
            color: #0876c4;
            margin-bottom: 10px;
        }
        hr {
            border: 1px solid #ccc;
            margin: 15px 0;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Contact Message</h2>
        
        <h4>Message From: <span style="color: #0876c4;">{{ $contact['name'] }}</span></h4>
        <h4>Email from: <span style="color: #0876c4;">{{ $contact['email'] }}</span></h4>
        
        <hr>
        
        <p>{{ $contact['message'] }}</p>
    </div>
</body>
</html>

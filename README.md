# Workouts
Workout API mande in Node.js

## API Routes

### `POST /allocations`

Starts the allocation process for a workout

Expected body request:
```json
{
	"workout_id": 2,
	"participants": [
		2, 3, 4, 5, 6
	]
} 
```

Expected response:
```json
{
    "allocations": [
        {
            "user_id": 2,
            "sensor_id": 5,
            "sensor_is_user_property": true
        },
        {
            "user_id": 3,
            "sensor_id": 8,
            "sensor_is_user_property": true
        },
        {
            "user_id": 4,
            "sensor_id": 1,
            "sensor_is_user_property": false
        },
        {
            "user_id": 5,
            "sensor_id": 10,
            "sensor_is_user_property": true
        },
        {
            "user_id": 6,
            "sensor_id": 4,
            "sensor_is_user_property": false
        }
    ],
    "participants_without_allocation": []
}
```

### `GET /allocations/{workout_id}`

Fetches the allocations of a workout

Expected response:
```json
{
    "allocations": [
        {
            "user_id": 2,
            "sensor_id": 5,
            "sensor_is_user_property": true
        },
        {
            "user_id": 6,
            "sensor_id": 1,
            "sensor_is_user_property": false
        },
        {
            "user_id": 9,
            "sensor_id": 4,
            "sensor_is_user_property": true
        },
        {
            "user_id": 11,
            "sensor_id": 4,
            "sensor_is_user_property": false
        },
        {
            "user_id": 14,
            "sensor_id": 7,
            "sensor_is_user_property": false
        }
    ]
}
```

## Socket.io events

### ON connection

Receives a socket.io connection

### ON sensor failure

Receives a complaining that the sensor allocated is not working

### EMIT new allocations

Broadcasts allocation data whenever new allocations are made

### EMIT new sensor

Emits back to the person complaining about its sensor which new sensor was allocated to the current workout.

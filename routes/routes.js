const router = require("express").Router();
const Workout = require("../models/workout.js");
const mongojs = require("mongojs");
let db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// POST route for saving a new post
router.post("/api/workouts", function (req, res) {
    const workout = new Workout();
    workout.day = new Date().setDate(new Date().getDate());
    Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout)
            console.log(dbWorkout)
        })
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body)
    if (req.body.type === "cardio") {
        db.Workout.findOneAndUpdate(
            {
                _id: mongojs.ObjectId(req.params.id)
            },
            {
                $push: {
                    exercises: {
                        type: req.body.type,
                        name: req.body.name,
                        duration: req.body.duration,
                        distance: req.body.distance
                    }
                }
            }
        )
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    }
    if (req.body.type === "resistance") {
        db.Workout.findOneAndUpdate(
            {
                _id: mongojs.ObjectId(req.params.id)
            },
            {
                $push: {
                    exercises: {
                        type: req.body.type,
                        name: req.body.name,
                        duration: req.body.duration,
                        weight: req.body.weight,
                        reps: req.body.reps,
                        sets: req.body.sets
                    }
                }
            }
        )
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    }
});

module.exports = router;
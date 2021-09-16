import React, { useState } from "react"

export default function App() {
    const [name, setName] = useState("")
    const [time, setTime] = useState("")
    const [error, userError] = useState("")
    const [reminder, reminderName] = useState(null)
    const [btn, buttonDisabled] = useState(false)
    const [initialReminder, setReminder] = useState(true)

    const startReminder = () => {
        if (initialReminder === false) {
            userError("Please wait...")
            return
        }
        let lastTime = time
        if (name === "") {
            userError("Please complete with the reminder name.")
            return
        } else if (time === "") {
            userError("Please complete with the reminder time.")
            return
        } else if (name.length > 500) {
            userError("The reminder cannot contain more than 500 characters!")
            return
        } else if (time > 3600) {
            userError("You can put a reminder of maximum 3600 seconds.")
            return
        }
        buttonDisabled(true)
        userError("")
        function reminderFunction() {
            if (lastTime !== 0) {
                reminderName(`Start reminder! Name: ${name}, Seconds: ${lastTime}`)
                lastTime--
            } else {
                reminderName("Finished!")
                clearInterval(refreshIntervalId)
            }
            setReminder(false)
        }
        reminderFunction()
        const refreshIntervalId = setInterval(() => {
            reminderFunction()
        }, 1000)
    }
    const enableButton = () => {
        buttonDisabled(false)
        reminderName("")
        userError("You can set a new reminder right now 😉")
        setReminder(true)
    }
    return (
        <div>
            <h2>Set a Reminder!!</h2>
            <div className="set-reminder">
                <div className="inputs">
                    <span><input type="text" placeholder="Reminder name here!" width="500" className="reminder" onInput={e => setName(e.target.value)} value={name} /></span>
                    <span><input type="number" placeholder="Enter time in seconds" width="500" className="time" onInput={e => setTime(e.target.value)} value={time} /></span>
                </div>
                <p className="error">{error}</p>
                <button className="submit-button" type="button" onClick={() => startReminder()} disabled={btn}>Start Reminder</button>
                <button className="submit-button" type="button" onClick={() => enableButton()}>Clear all!</button>
                <div className="div-reminder">
                    <p className="reminder-info">{reminder}</p>
                </div>
            </div>
        </div>
    )
}
radio.setGroup(124)
radio.setFrequencyBand(52)

type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    r: DigitalPin
}
const IR: IRC = {
    l: DigitalPin.P14,
    c: DigitalPin.P15,
    r: DigitalPin.P13
}

function drive(leftSpeed: number, rightSpeed: number) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, leftSpeed)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, rightSpeed)
}

function isIntersection(): boolean {
    let count = dataLeft + dataCenter + dataRight
    if (count >= 2) {
        return true
    } else {
        return false
    }
}

pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);

let dataLeft: number
let dataRight: number
let dataCenter: number
let turn: string

basic.forever(function () {
    dataLeft = pins.digitalReadPin(IR.l)
    dataRight = pins.digitalReadPin(IR.r);
    dataCenter = pins.digitalReadPin(IR.c);
    
    if (isIntersection()) {
        if (turn === "L") {
            drive(0, -255)
            basic.pause(500)
        } else if (turn === "C") {
            drive(-255, -150)
            basic.pause(500)
        } else if (turn === "R") {
            drive(-255, 0)
            basic.pause(500)
        }
    } else {
        if (dataCenter === 1) {
            drive(-255, -150)
        } else if (dataLeft === 1) {
            drive(0, -255)
        } else if (dataRight === 1) {
            drive(-255, 0)
        } else {
            drive(100, 100)
        }
    }

    console.log(turn)
    basic.pause(20)
})

radio.onReceivedString(function (receivedString: string) {
    turn = receivedString
})

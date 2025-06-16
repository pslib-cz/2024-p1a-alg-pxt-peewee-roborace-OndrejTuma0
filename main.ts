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

    if (turn === "L") {
        if (dataLeft + dataRight + dataCenter > 2) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
            basic.pause(1000)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 255)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -255)
            basic.pause(350)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
            basic.pause(300)
            turn = "C"
        } else if (dataCenter === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -255/1.4)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -150/1.4)
        } else if (dataRight === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -255/1.5)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
        } else if (dataLeft === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -255/1.5)
        } 

    }
    else if (turn === "C") {
        if (dataCenter === 1) {
            
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -255/1.4)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -150/1.4)
        } else if (dataRight === 1) {
            
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -200/1.5)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
        } else if (dataLeft === 1) {
           
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -200/1.5)
        } 

    } else if (turn === "R") {

        if (dataLeft + dataRight + dataCenter > 2) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
            basic.pause(1000)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -150)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -75)
            basic.pause(100)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -255)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 150)
            basic.pause(350)

            turn = "C"
        } else if (dataCenter === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -255/1.4)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -150/1.4)
        } else if (dataRight === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, -255/1.5)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
        } else if (dataLeft === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -255/1.5)
        }
    } 
    
})

radio.onReceivedString(function (receivedString: string) {
    turn = receivedString
})

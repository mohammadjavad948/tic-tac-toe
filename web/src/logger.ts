
export class Logger{
    static infoColor = 'color: purple';
    static dangerColor = 'color: red';
    static warningColor = 'color: yellow';
    static textColor = 'color: black';

    static info(type: string, message: string){
        console.log(`%c[${type}] %c${message}`, this.infoColor, this.textColor)
    }

    static danger(type: string, message: string){
        console.log(`%c[${type}] %c${message}`, this.dangerColor, this.textColor)
    }

    static warning(type: string, message: string){
        console.log(`%c[${type}] %c${message}`, this.warningColor, this.textColor)
    }
}
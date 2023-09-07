export default class Graphics {
    private gender: string
    private body: string
    private head: string
    private hair: string
    private shirt: string
    private legs: string
    private weapon: string

    constructor() {
    }

    public setAll(
        gender: string,
        body: string,
        head: string,
        hair: string,
        shirt: string,
        legs: string,
        weapon: string
    ) {
        this.gender = gender
        this.body = body
        this.head = head
        this.hair = hair
        this.shirt = shirt
        this.legs = legs
        this.weapon = weapon
    }

    public setGender(gender: string) {
        this.gender = gender
    }

    public setBody(body: string) {
        this.body = body
    }

    public setHead(head: string) {
        this.head = head
    }

    public setHair(hair: string) {
        this.hair = hair
    }

    public setShirt(shirt: string) {
        this.shirt = shirt
    }

    public setLegs(legs: string) {
        this.legs = legs
    }

    public setWeapon(weapon: string) {
        this.weapon = weapon
    }

    public getAttributes(): string[] {
        let attributes = [this.gender, this.body, this.head, this.hair, this.shirt, this.legs, this.weapon]

        attributes = attributes.filter((e) => e !== undefined)
        return attributes
    }

    public import(arr: string[]) {
        arr = arr.reduce((acc, row) => acc.concat(row), [])

        arr.forEach(graphic => {
            this.switcher(graphic)
        })
    }

    public switcher(graphic: string) {
        switch (true) {
            case graphic.includes("BODY"):
                this.setBody(graphic)
                break;
            case graphic.includes("HEAD"):
                this.setHead(graphic)
                break;
            case graphic.includes("HAIR"):
                this.setHair(graphic)
                break;
            case graphic.includes("SHIRT"):
                this.setShirt(graphic)
                break;
            case graphic.includes("LEGS"):
                this.setLegs(graphic)
                break;
            case graphic.includes("WEAPON"):
                this.setWeapon(graphic)
                break;
            default:
                break;
        }
    }
}
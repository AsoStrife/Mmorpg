export default class Graphics {
    private gender: string
    private body: string
    private head: string
    private hair: string
    private shirt: string
    private pants: string
    private weapon: string

    constructor() {
    }

    setAll(
        gender: string,
        body: string,
        head: string,
        hair: string,
        shirt: string,
        pants: string,
        weapon: string
    ) {
        this.gender = gender
        this.body = body
        this.head = head
        this.hair = hair
        this.shirt = shirt
        this.pants = pants
        this.weapon = weapon
    }

    setGender(gender: string) {
        this.gender = gender
    }

    setBody(body: string) {
        this.body = body
    }

    setHead(head: string) {
        this.head = head
    }

    setHair(hair: string) {
        this.hair = hair
    }

    setShirt(shirt: string) {
        this.shirt = shirt
    }

    setPants(pants: string) {
        this.pants = pants
    }

    setWeapon(weapon: string) {
        this.weapon = weapon
    }

    getAttributesArray(): string[] {
        return [this.gender, this.body, this.head, this.hair, this.shirt, this.pants, this.weapon]
    }
}
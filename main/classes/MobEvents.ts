attack(victim: RpgPlayer) {
        if (this.dead || this.fightingWithId !== null) {
            return;
        }

        this.fightingWithId = victim.id;

        if (this.physicallAttackObserver) {
            this.physicallAttackObserver.unsubscribe();
        }

        this.physicallAttackObserver = interval(1000 / this.attackSpeed)
            .pipe(
                takeWhile(() => this.hp > 0),
                takeWhile(() => this.fightingWithId !== null),
                takeWhile(() => victim.getCurrentMap() !== undefined),
                takeWhile(() => victim.getCurrentMap()?.id === this.getCurrentMap()?.id),
            )
            .subscribe(() => this.singlePhysicalAttack(victim));
    }
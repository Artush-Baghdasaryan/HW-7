import { AnimationTriggerMetadata, animate, state, style, transition, trigger } from "@angular/animations";

export class Animations {
    public static readonly appears: AnimationTriggerMetadata = trigger(
        "appears", [
            state("hover", style({
                opacity: 1,
                transform: "translateY(0)"
            })),
            state("noHover", style({
                opacity: 0,
                transform: "translateY(-50%)"
            })),
            transition('noHover => hover', [
                animate("0.5s ease-in-out")
            ]),
            transition('hover => noHover', [
                animate("0.5s")
            ]),
        ]
    )
}

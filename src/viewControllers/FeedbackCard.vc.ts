import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class FeedbackCardViewController extends AbstractViewController<Card> {
    public static id = 'feedback-card'
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.cardVc = this.Controller('card', {
            header: {
                title: 'Hello feedback card!',
            },
        })
    }

    public render() {
        return this.cardVc.render()
    }
}

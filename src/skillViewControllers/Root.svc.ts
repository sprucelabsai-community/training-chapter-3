import {
    AbstractSkillViewController,
    ViewControllerOptions,
    SkillView,
    CardViewController,
} from '@sprucelabs/heartwood-view-controllers'

export default class RootSkillViewController extends AbstractSkillViewController {
    public static id = 'root'
    protected cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.CardVc()
    }

    private CardVc(): CardViewController {
        return this.Controller('card', {
            header: {
                image: 'https://s3.amazonaws.com/storybook.sprucelabs.ai/card-header-1.png',
            },
            body: {
                sections: [
                    {
                        buttons: [
                            {
                                id: 'values',
                                label: 'Family Values',
                            },
                            {
                                id: 'members',
                                label: 'Family Members',
                            },
                            {
                                id: 'feedback',
                                label: 'Feedback',
                                onClick: this.handleClickFeedback.bind(this),
                            },
                            {
                                id: 'write',
                                label: 'Write Story',
                                type: 'primary',
                            },
                        ],
                    },
                ],
            },
        })
    }

    private async handleClickFeedback() {
        const feedbackCardVc = this.Controller(
            'eightbitstories.feedback-card',
            {
                onSubmit: () => dialogVc.hide(),
            }
        )
        const dialogVc = this.renderInDialog(feedbackCardVc.render())
    }

    public async getIsLoginRequired() {
        return true
    }

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [this.cardVc.render()],
                },
            ],
        }
    }
}

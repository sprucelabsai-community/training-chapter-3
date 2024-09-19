import {
    AbstractViewController,
    ViewControllerOptions,
    Card,
    CardViewController,
    buildForm,
    FormViewController,
} from '@sprucelabs/heartwood-view-controllers'
import { buildSchema } from '@sprucelabs/schema'

export default class FeedbackCardViewController extends AbstractViewController<Card> {
    public static id = 'feedback-card'
    private cardVc: CardViewController
    protected formVc: FormViewController<FeedbackFormSchema>

    public constructor(options: ViewControllerOptions) {
        super(options)

        this.formVc = this.FormVc()
        this.cardVc = this.CardVc()
    }

    private CardVc(): CardViewController {
        return this.Controller('card', {
            header: {
                title: 'Tell me what you think!',
            },
            body: {
                sections: [
                    {
                        text: {
                            content:
                                'We so appreciate you using our skill to write stories! It means a lot to us and we also really look forward to your feedback!',
                        },
                    },
                    {
                        form: this.formVc.render(),
                    },
                ],
            },
        })
    }

    private FormVc() {
        return this.Controller(
            'form',
            buildForm({
                schema: feedbackFormSchema,
                shouldShowCancelButton: false,
                onSubmit: this.handleSubmit.bind(this),
                sections: [
                    {
                        fields: [
                            {
                                name: 'feedback',
                                label: `Tell us what you think or how we can make this better!`,
                                renderAs: 'textarea',
                            },
                        ],
                    },
                ],
            })
        )
    }

    private async handleSubmit() {
        const client = await this.connectToApi()
        await client.emitAndFlattenResponses(
            'eightbitstories.submit-feedback::v2024_09_19',
            {
                payload: {
                    feedback: 'aoeuaoeu',
                },
            }
        )
    }

    public render() {
        return this.cardVc.render()
    }
}

const feedbackFormSchema = buildSchema({
    id: 'feedbackForm',
    fields: {
        feedback: {
            type: 'text',
            isRequired: true,
            label: 'Feedback',
        },
    },
})

type FeedbackFormSchema = typeof feedbackFormSchema

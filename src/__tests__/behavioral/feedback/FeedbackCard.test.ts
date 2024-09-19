import { formAssert, interactor } from '@sprucelabs/heartwood-view-controllers'
import { eventFaker, fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import FeedbackCardViewController from '../../../feedback/FeedbackCard.vc'

@fake.login()
export default class FeedbackCardTest extends AbstractSpruceFixtureTest {
    private static vc: SpyFeedbackCard

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()

        this.views.setController(
            'eightbitstories.feedback-card',
            SpyFeedbackCard
        )
        this.vc = this.views.Controller(
            'eightbitstories.feedback-card',
            {}
        ) as SpyFeedbackCard
    }

    @test()
    protected static rendersAForm() {
        formAssert.cardRendersForm(this.vc)
    }

    @test()
    protected static rendersFeedbackField() {
        formAssert.formRendersField(this.formVc, 'feedback')
    }

    @test()
    protected static rendersFeedbackAsTextarea() {
        formAssert.formFieldRendersAs(this.formVc, 'feedback', 'textarea')
    }

    @test()
    protected static doesNotRenderCancelButton() {
        assert.isFalse(
            this.formVc.getShouldRenderCancelButton(),
            `You should not be rendering the cancel button!`
        )
    }

    @test()
    protected static async submittingFormEmitsSubmitFeedbackEvent() {
        let wasHit = false
        await eventFaker.on(
            'eightbitstories.submit-feedback::v2024_09_19',
            () => {
                wasHit = true
                return {
                    success: true,
                }
            }
        )

        await this.formVc.setValue('feedback', generateId())
        await interactor.submitForm(this.formVc)

        assert.isTrue(wasHit, `Form did not emit submit event`)
    }

    private static get formVc() {
        return this.vc.getFormVc()
    }
}

class SpyFeedbackCard extends FeedbackCardViewController {
    public getFormVc() {
        return this.formVc
    }
}

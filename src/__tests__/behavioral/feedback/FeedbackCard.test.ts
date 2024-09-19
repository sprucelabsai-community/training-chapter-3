import { formAssert } from '@sprucelabs/heartwood-view-controllers'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, test } from '@sprucelabs/test-utils'
import FeedbackCardViewController from '../../../viewControllers/FeedbackCard.vc'

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

    private static get formVc() {
        return this.vc.getFormVc()
    }
}

class SpyFeedbackCard extends FeedbackCardViewController {
    public getFormVc() {
        return this.formVc
    }
}

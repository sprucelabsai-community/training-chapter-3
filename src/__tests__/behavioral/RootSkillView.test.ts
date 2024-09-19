import {
    buttonAssert,
    interactor,
    vcAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { eventFaker, fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import FeedbackCardViewController from '../../feedback/FeedbackCard.vc'
import RootSkillViewController from '../../skillViewControllers/Root.svc'
import { SpyFeedbackCard } from './feedback/SpyFeedbackCard'

@fake.login()
export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    private static vc: SpyRootSkillView

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()

        await eventFaker.on(
            'eightbitstories.submit-feedback::v2024_09_19',
            () => {
                return {
                    success: true,
                }
            }
        )

        this.views.setController(
            'eightbitstories.feedback-card',
            SpyFeedbackCard
        )
        this.views.setController('eightbitstories.root', SpyRootSkillView)
        this.vc = this.views.Controller(
            'eightbitstories.root',
            {}
        ) as SpyRootSkillView
    }

    @test()
    protected static rendersCard() {
        vcAssert.assertSkillViewRendersCard(this.vc)
    }

    @test()
    protected static async requiresLogin() {
        await vcAssert.assertLoginIsRequired(this.vc)
    }

    @test()
    protected static rendersExpectedButtons() {
        buttonAssert.cardRendersButtons(this.cardVc, [
            'values',
            'members',
            'feedback',
            'write',
        ])
    }

    @test()
    protected static async clickingFeedbackRendersDialog() {
        await this.clickFeedbackAndAssertDialog()
    }

    @test()
    protected static async submittingFeedbackClosesDialog() {
        const { feedbackCardVc, dialogVc } =
            await this.clickFeedbackAndAssertDialog()

        await feedbackCardVc.getFormVc().setValue('feedback', generateId())

        assert.isTrue(
            dialogVc.getIsVisible(),
            `You hid your dialog too soon! Do it after submit!`
        )

        await interactor.submitForm(feedbackCardVc.getFormVc())

        assert.isFalse(
            dialogVc.getIsVisible(),
            'You did not hide the form after sumbit!'
        )
    }

    private static async clickFeedbackAndAssertDialog() {
        const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
            interactor.clickButton(this.cardVc, 'feedback')
        )

        const feedbackCardVc = vcAssert.assertRendersAsInstanceOf(
            dialogVc,
            FeedbackCardViewController
        )

        return { dialogVc, feedbackCardVc: feedbackCardVc as SpyFeedbackCard }
    }

    private static get cardVc() {
        return this.vc.getCardVc()
    }
}

class SpyRootSkillView extends RootSkillViewController {
    public getCardVc() {
        return this.cardVc
    }
}

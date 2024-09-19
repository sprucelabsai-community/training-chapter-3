import {
    buttonAssert,
    interactor,
    vcAssert,
} from '@sprucelabs/heartwood-view-controllers'
import { fake } from '@sprucelabs/spruce-test-fixtures'
import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import { test } from '@sprucelabs/test-utils'
import FeedbackCardViewController from '../../feedback/FeedbackCard.vc'
import RootSkillViewController from '../../skillViewControllers/Root.svc'

@fake.login()
export default class RootSkillViewTest extends AbstractSpruceFixtureTest {
    private static vc: SpyRootSkillView

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()

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
        const dialogVc = await vcAssert.assertRendersDialog(this.vc, () =>
            interactor.clickButton(this.cardVc, 'feedback')
        )

        vcAssert.assertRendersAsInstanceOf(dialogVc, FeedbackCardViewController)
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

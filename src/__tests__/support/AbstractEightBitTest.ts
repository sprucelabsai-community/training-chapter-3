import { AbstractSpruceFixtureTest } from '@sprucelabs/spruce-test-fixtures'
import EventFaker from './EventFaker'

export default abstract class AbstractEightBitTest extends AbstractSpruceFixtureTest {
    protected static eventFaker: EventFaker

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.eventFaker = new EventFaker()
    }
}

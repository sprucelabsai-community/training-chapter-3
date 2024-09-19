import { eventFaker, SpruceSchemas } from '@sprucelabs/spruce-test-fixtures'

export default class EventFaker {
    public async fakeSubmitFeedback(
        cb?: (targetAndPayload: SubmitFeedbackTargetAndPayload) => void
    ) {
        await eventFaker.on(
            'eightbitstories.submit-feedback::v2024_09_19',
            (targetAndPayload) => {
                cb?.(targetAndPayload)
                return {
                    success: true,
                }
            }
        )
    }
}

type SubmitFeedbackTargetAndPayload =
    SpruceSchemas.Eightbitstories.v2024_09_19.SubmitFeedbackEmitTargetAndPayload

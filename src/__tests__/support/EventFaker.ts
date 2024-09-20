import {
    eventFaker,
    fake,
    SpruceSchemas,
} from '@sprucelabs/spruce-test-fixtures'
import { generateId } from '@sprucelabs/test-utils'

export default class EventFaker {
    public async fakeGetPerson(
        cb?: (targetAndPayload: GetPersonTargetAndPayload) => void
    ) {
        await eventFaker.on('get-person::v2020_12_25', (targetAndPayload) => {
            cb?.(targetAndPayload)
            return {
                person: fake.getPerson(),
            }
        })
    }
    public async fakeSendMessage(
        cb?: (targetAndPayload: SendMessageTargetAndPayload) => void
    ) {
        await eventFaker.on('send-message::v2020_12_25', (targetAndPayload) => {
            cb?.(targetAndPayload)
            return {
                message: {
                    id: generateId(),
                    body: generateId(),
                    dateCreated: Date.now(),
                    classification: 'transactional' as const,
                    target: {},
                    source: {},
                },
            }
        })
    }

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

export type SendMessageTargetAndPayload =
    SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayload

export type GetPersonTargetAndPayload =
    SpruceSchemas.Mercury.v2020_12_25.GetPersonEmitTargetAndPayload

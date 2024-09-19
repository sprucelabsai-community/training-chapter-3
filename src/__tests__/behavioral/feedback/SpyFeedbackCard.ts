import FeedbackCardViewController from "../../../feedback/FeedbackCard.vc";

export class SpyFeedbackCard extends FeedbackCardViewController {
    public getFormVc() {
        return this.formVc;
    }
}

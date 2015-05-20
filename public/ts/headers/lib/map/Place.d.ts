/**
 * TODO: doc
 *
 * @interface PlaceModel
 */
interface PlaceModel {

    _id: string;

    answers: PlaceModelAnswers;

    dates?: PlaceModelDates;

    dominant: string;

    position: PlaceModelPosition;
}
/**
 * TODO: doc
 *
 * @interface PlaceModelAnswers
 */
interface PlaceModelAnswers {

    no: number;

    yes: number;
}
/**
 * TODO: doc
 *
 * @interface PlaceModelDates
 */
interface PlaceModelDates {

    created: Date;

    modified: Date;
}
/**
 * TODO: doc
 *
 * @interface PlaceModelPosition
 */
interface PlaceModelPosition {

    latitude: number;

    longitude: number;
}
/**
 * TODO: doc
 *
 * @interface PlaceSubmission
 */
interface PlaceSubmission {

    answer: string;

    position: PlaceSubmissionPosition;
}
/**
 * TODO: doc
 *
 * @interface PlaceSubmissionPosition
 */
interface PlaceSubmissionPosition {

    lat: number;

    lng: number;
}

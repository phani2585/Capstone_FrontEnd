import * as Constants from "./Constants";
import * as Utils from "./Utils";

/**
 * Function to find the validation message class name for a form field
 * @param value string value for the given enum type
 * @param type enum indicating the form field or the validation message
 * @returns "dispBlock" or "dispNone" based on value and type
 */
export const findValidationMessageClassname = (value, type) => {
  if (type === Constants.ValueTypeEnum.FORM_FIELD) {
    return Utils.isUndefinedOrNullOrEmpty(value)
      ? Constants.DisplayClassname.DISPLAY_BLOCK
      : Constants.DisplayClassname.DISPLAY_NONE;
  } else if (type === Constants.ValueTypeEnum.VALIDATION_MESSAGE) {
    return Utils.isUndefinedOrNullOrEmpty(value)
      ? Constants.DisplayClassname.DISPLAY_NONE
      : Constants.DisplayClassname.DISPLAY_BLOCK;
  }
  return "";
};


/**
 * Function to add a user comment to an image
 * @param currentImageIndex current image index on which the comment is to be added
 */
export const addUserComment = (imageData, comment, currentImageIndex) => {
  if (
    !Utils.isUndefinedOrNullOrEmpty(comment) &&
    !Utils.isUndefinedOrNullOrEmpty(currentImageIndex)
  ) {
    let commentsArr = [];
    commentsArr =
      Utils.isUndefinedOrNull(imageData[currentImageIndex].commentList) ||
      imageData[currentImageIndex].commentList.length === 0
        ? []
        : imageData[currentImageIndex].commentList;

    commentsArr.push({
      id: "comment-" + new Date().getTime(),
      username: sessionStorage.getItem("user-details"),
      comment: comment
    });

    imageData[currentImageIndex].commentList = commentsArr;
    return imageData;
  }
  return null;
};

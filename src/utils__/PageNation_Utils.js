import _ from "lodash";
export const returnPageNationRange = function (
  totalPage,
  pageNo,
  pageLimit,
  sibiling
) {
  const totalPageNoInArray = 7 + sibiling;
  console.log(totalPageNoInArray,"total")
  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1);
  }
  const leftSibilingsIndex = Math.max(pageNo - sibiling, 1);
  const rightSibilingIndex = Math.min(pageNo + sibiling, totalPage);
  const showLeftDots = leftSibilingsIndex > 2;
  const showRightDots = rightSibilingIndex < totalPage - 2;
 console.log(leftSibilingsIndex,rightSibilingIndex,"assss")
  if (!showLeftDots && showRightDots) {
      console.log("asss")
    const leftIndexCount = 3 + 2 * sibiling;
    const leftRange = _.range(1, leftIndexCount + 1);
    console.log(...leftRange, " ...", totalPage,"array")
    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    const rightIndexCount = 3 + 2 * sibiling;
    const rightRange = _.range(totalPage - rightIndexCount + 1, totalPage + 1);
    return [1, "... ", ...rightRange];
  } else {
    const middleRange = _.range(leftSibilingsIndex, rightSibilingIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage];
  }
};

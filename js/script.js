const state = {
  InactiveVisible: 0,
  AllVisible: 1
};
const flags = new Map();

function setInactiveCount() {
  const fights = document.getElementsByClassName("column");
  for (let index = 0; index < fights.length; index++) {
    const inactiveCount = fights[index].getElementsByClassName(
      "not-participant"
    ).length;
    const el = fights[index].getElementsByClassName("header");
    let text = el[0].innerHTML;
    text = text.replace(/{{count}}/, inactiveCount);
    el[0].innerHTML = text;
  }
}

function convertRelativeToAbsolute() {
  const members = document.getElementsByTagName("a");
  for (let index = 0; index < members.length; index++) {
    const relativeLink = members[index].getAttribute("href");
    members[index].setAttribute(
      "href",
      `https://v3.g.ladypopular.com${relativeLink}`
    );
    members[index].setAttribute("target", "_blank");
  }
}

function isUnset(data) {
  return data === undefined;
}

function showHandler(evt, index) {
  const currState = flags.get(index);
  if (currState === state.AllVisible || isUnset(currState)) {
    flags.set(index, state.InactiveVisible);
    showInactive(index);
    evt.textContent = "Show All";
  } else if (currState === state.InactiveVisible) {
    flags.set(index, state.AllVisible);
    showAll(index);
    evt.textContent = "Show Inactive";
  }
}

function showInactive(index) {
  const lists = document.getElementsByClassName("column");
  const activeEls = lists[index].getElementsByClassName("participant");
  for (let index = 0; index < activeEls.length; index++) {
    activeEls[index].classList.add("hide");
  }
}

function showAll(index) {
  const lists = document.getElementsByClassName("column");
  const activeEls = lists[index].getElementsByClassName("participant");
  for (let index = 0; index < activeEls.length; index++) {
    activeEls[index].classList.remove("hide");
  }
}

(function () {
  setInactiveCount();
  convertRelativeToAbsolute();
})();

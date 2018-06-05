/*
*  usage:
*  wrap triggers and views with a container and giv it the "data-toggle-container" attribute
*  giv each trigger-view pair the corresponding attributes "data-toggle-trigger" "data-toggle-view"
*  and with a matching value
*  use the "data-toggle-default-view" attribute if you want a certain view to show by default
*
*  Example:
*
*
*<div data-toggle-container>
*    <div>
*        <div class="trigger" data-toggle-trigger="1">trigger 1</div>
*        <div class="trigger" data-toggle-trigger="2">trigger 2</div>
*        <div class="trigger" data-toggle-trigger="3">trigger 3</div>
*        <div class="trigger" data-toggle-trigger="4">trigger 4</div>
*    </div>
*    <div>
*        <div class="view" data-toggle-view="1">view 1</div>
*        <div class="view" data-toggle-view="2">view 2</div>
*        <div class="view" data-toggle-view="3" "data-toggle-default-view">view 3</div>
*        <div class="view" data-toggle-view="4">view 4</div>
*    </div>
*</div>
*
* */
const triggerAtt = "data-toggle-trigger";
const viewAtt = "data-toggle-view";
const contAtt = "data-toggle-container";
const defAtt = "data-toggle-default-view";

function getAllTriggers(domElement) {
    return domElement.querySelectorAll("[" + triggerAtt + "]");
}

function getAllToggleViews(domElement) {
    const allToggleViews = {};
    for (const toggleView of domElement.querySelectorAll("[" + viewAtt + "]")) {
        allToggleViews[toggleView.getAttribute(viewAtt)] = toggleView;
    }
    return allToggleViews;
}

function getAllContainers(domElement) {
    return domElement.querySelectorAll("[" + contAtt + "]");
}

function initiateToggle() {
    let allContainers = [];

    function closeAllViews(multiViewObj) {
        for (const view of Object.keys(multiViewObj)) {
            multiViewObj[view].style.display = "none";
        }
    }

    for (const container of getAllContainers(document)) {
        let containerOBJ = {
            triggers: getAllTriggers(container),
            views: getAllToggleViews(container),
            onClickTrigger: function (key) {
                closeAllViews(this.views);
                this.views[key].style.display = "block";
                console.log(this)
            }
        };
        closeAllViews(containerOBJ.views);
        let defaultView = container.querySelector("[" + defAtt + "]");
        if (defaultView != null) {
            defaultView.style.display = "block";
        }

        for (const trigger of containerOBJ.triggers) {
            trigger.onclick = function () {
                containerOBJ.onClickTrigger(this.getAttribute(triggerAtt));
            }
        }
        allContainers.push(containerOBJ);
    }
}

function initiateFramework() {
    initiateToggle();
}

document.addEventListener("DOMContentLoaded", function () {
    initiateFramework();
});
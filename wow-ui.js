Hooks.on('init', () => {

    game.settings.register("foundrycraft", "chosenTheme", {
        name: 'Select Theme',
        hint: 'Select one from the different UI themes',
        scope: "world",
        config: true,
        default: "wow-neutral",
        type: String,
        choices: {
            "0": 'none',
            "wow-neutral": 'Neutral',
            "wow-horde": 'Horde',
            "wow-alliance": 'Alliance',
        },
        onChange: (theme) => {
            applyWowSkin(theme);
        }
    });
});

Hooks.on('ready', () => {
    let theme = game.settings.get('vtt-craft', 'wow-neutral');
    applyWowSkin(theme);
});

Hooks.on('renderActorSheet', (app, html, data) => {
    if (game.settings.get('vtt-craft', 'chosenTheme') !== '0' && app.changedWidth === undefined) {
        let correctionFactor = 40;
        let newMinWidth = Number($(html).css('min-width').replace('px', '')) + correctionFactor;

        app.options.width += correctionFactor;
        html.width(html.width() + correctionFactor);
        $(html).css('min-width', newMinWidth);
        app.changedWidth = true;
    }
});

Hooks.on('renderItemSheet', (app, html, data) => {
    /*if (game.settings.get('vtt-craft', 'chosenTheme') !== '0') {
        console.log('rendering');
        let correctionFactor = 40;
        let newMinWidth = Number($(html).css('min-width').replace('px', '')) + correctionFactor;

        app.position.width += correctionFactor;
        html.width(html.width() + correctionFactor);
        $(html).css('min-width', newMinWidth);
    }*/
});

Hooks.on('renderPlayerList', (app, html, data) => {
    if (game.settings.get('vtt-craft', 'chosenTheme') !== '0') {
        let playerDisplay = html.find('.player');
        for (let li of playerDisplay) {
            let user = game.users.get(li.dataset.userId);

            let img = user.avatar;
            let imgText = `url("${img}")`;
            let imgElement = imgText;
            $(li).find('.player-active').css('background', 'none');
            $(li).find('.player-active').css('background-image', imgText);
            $(li).find('.player-active').css('background-size', 'contain');
        }
    }
});

function applyWowSkin(theme) {
    let element = $('.vtt');

    if (theme !== '0') {
        // remove previous theme
        element.removeClass("wow-neutral");
        element.removeClass("wow-horde");
        element.removeClass("wow-alliance");
        
        if (!element.hasClass("wow-general")) {
            element.addClass("wow-general");
        }
        if (!element.hasClass(theme)) {
            element.addClass(theme);
        }
    } else {
        element.removeClass("wow-general");
        element.removeClass(theme);
    }
}

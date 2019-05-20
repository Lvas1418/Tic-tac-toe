mocha.setup('bdd');

let assert = chai.assert;

describe('Check start game', function () {

    let btnStart = document.getElementById('start');
    let btnStartStyle = getComputedStyle(btnStart);
    let inputNameSection = document.getElementById('name');
    let inputNameSectionStyle = getComputedStyle(inputNameSection);

    let input = document.getElementById('inputName');
    let crossImg = document.getElementById('crossImg');
    let marks = document.getElementById('marks');
    let marksStyle = getComputedStyle(Init.marks);

    let canvas = document.getElementById('canvas');
    let canvasStyle = getComputedStyle(canvas);
    let buttonName = document.getElementById('buttonName');


    after(function () {

        btnStart.style.display = 'block';
        input.style.display = 'block';
        inputNameSection.style.display = 'flex';
        inputNameSection.style.visibility = 'hidden';

        setTimeout(() => {

            marks.style.display = 'flex';
            Init.marks.style.visibility = 'hidden';
            canvas.style.visibility = 'hidden';
        }, 600);

        crossImg.src = "./img/cross.PNG";
        input.value = '';
        Init.mark = '';
        sinon.restore();
    });

    it('Check that object "game" belong to a class"Game"', function () {

        assert.isTrue(game instanceof Game);

    });

    it('Check that button "start" works and hides', function () {

        let event = new Event("click");

        btnStart.dispatchEvent(event);

        assert.equal('none', btnStartStyle.display);

    });

    it('Check that "sessionId","name" and "mark" is empty', function () {

        assert.equal(Init.sessionId, '');
        assert.equal(Init.name, '');
        assert.equal(Init.mark, '');

    });

    it('Check that canWeMove =  false', function () {

        assert.equal(Init.canWeMove, false);

    });

    it('Check that name entry form is visible', function () {

        let event = new Event("click");

        btnStart.dispatchEvent(event);

        assert.equal('visible', inputNameSectionStyle.visibility);

        input.value = 'opy';

    });

    it('Check that "setName" returns promise', function () {

        let promise = game.setName();

        assert.isTrue(promise instanceof Promise);

    });
    it('Check that the name entry form is hidden', function () {

        let event = new Event("click");

        buttonName.dispatchEvent(event);
        assert.equal('none', inputNameSectionStyle.display);

    });
    it('Check that "name" saved', function () {

        let name = 'opy';

        game.saveName(name);

        assert.equal(name, Init.name);

    });


    it('Check that marks choice is visible', function () {

        game.showСhoice();

        assert.equal('visible', marksStyle.visibility);

    });

    it('Check that mark saved', function () {

        let mark = document.getElementById("crossImg");
        let event = new Event("click");


        game.setMark();
        mark.dispatchEvent(event);

        assert.equal('cross', Init.mark);


    });

    it('Check that marks choice is hidden', function () {

        let marksStyle = getComputedStyle(Init.marks);

        setTimeout(() => {

            assert.equal('none', marksStyle.display);

        }, 600)

    });

    it('Check that field is visible', function () {

        setTimeout(() => {

            assert.equal('visible', canvasStyle.visibility);

        }, 600)
    });


});


describe('Check "getId"  behavior', function () {

    let sessionId = 'sessionId';
    let userName = 'userName';
    let response = Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            ok: true, data: {
                id: sessionId,
                canMove: true
            }
        })
    });

    before(function () {

        sinon.replace(window, 'fetch', sinon.fake.returns(response));

    });

    after(function () {
        setTimeout(() => {

            sinon.restore();

        }, 600)
        ;

    });

    it('Check that "getId" returns promise and data is correct', function () {

        let promise = game.getId();

        assert.isTrue(promise instanceof Promise);
        promise
            .then(json => {
                if (json.ok) {
                    assert.equal(json.data.id, 'sessionId');
                    assert.isTrue(json.data.canMove);
                }
            });
    });


});
mocha.run();
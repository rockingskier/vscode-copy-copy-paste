import * as assert from 'assert';

import * as vscode from 'vscode';
import History from '../src/History';


suite("History", () => {
    test("should be created with an empty buffer", () => {
        const history = new History();

        assert.deepEqual(history.get(), []);
    });

    suite('#get', () => {
        test('should return the buffer', () => {
            const history = new History();

            assert.deepEqual(history.get(), []);

            history.add(['Copied text 1']);

            assert.deepEqual(history.get(), [['Copied text 1']]);

            history.add(['Copied text 2']);

            assert.deepEqual(history.get(), [
                ['Copied text 2'],
                ['Copied text 1'],
            ]);
        })
    });

    suite('#add', () => {
        suite('new block', () => {
            test("should add the block to the buffer", () => {
                const history = new History();

                history.add(['Copied text 1']);

                assert.deepEqual(history.get(), [['Copied text 1']]);

                history.add(['Copied text 2']);

                assert.deepEqual(history.get(), [
                    ['Copied text 2'],
                    ['Copied text 1'],
                ]);
            });
        });

        suite('existing blocks', () => {
            test("should be moved to the 'top' of the buffer", () => {
                const history = new History();

                history.add(['Copied text 1']);
                history.add(['Copied text 2']);
                history.add(['Copied text 3']);

                assert.equal(history.get().length, 3);
                assert.deepEqual(history.get(), [
                    ['Copied text 3'],
                    ['Copied text 2'],
                    ['Copied text 1'],
                ]);

                history.add(['Copied text 1']);

                assert.equal(history.get().length, 3);
                assert.deepEqual(history.get(), [
                    ['Copied text 1'],
                    ['Copied text 3'],
                    ['Copied text 2'],
                ]);
            });
        });
    });

    suite('#clear', () => {
        test('should empty the buffer', () => {
            const history = new History();

            assert.equal(history.get().length, 0);

            history.add(['Copied text 1']);

            assert.equal(history.get().length, 1);

            history.clear();

            assert.equal(history.get().length, 0);
        })
    });

    suite('#setBufferLimit', () => {
        test('should limit the size of the buffer', () => {
            const history = new History();
            history.setBufferLimit(2);

            history.add(['Copied text 1']);
            history.add(['Copied text 2']);
            history.add(['Copied text 3']);

            assert.equal(history.get().length, 2);
            assert.equal(history.get()[0], 'Copied text 3');
            assert.equal(history.get()[1], 'Copied text 2');
        });

        test('should crop any existing buffer to lenth', () => {
            const history = new History();

            history.add(['Copied text 1']);
            history.add(['Copied text 2']);
            history.add(['Copied text 3']);

            assert.equal(history.get().length, 3);
            history.setBufferLimit(2);

            assert.equal(history.get().length, 2);
            assert.equal(history.get()[0], 'Copied text 3');
            assert.equal(history.get()[1], 'Copied text 2');
        });
    });
});
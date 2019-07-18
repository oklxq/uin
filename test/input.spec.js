import Inp from '../src/components/input';
import {mount} from '@vue/test-utils'
import Icon from '../src/components/icon';
import chai from 'chai';

chai.should();

const TestInput = {
    template: `
        <div>
            <span class="display">{{data}}</span>
            <Inp v-model="data"></Inp>
        </div>
    `,
    components: {Inp},
    data() {
        return {data: 'test'}
    }
};

describe('Input 组件', () => {
    const wrapper = mount(TestInput);

    it('v-model', done => {
        (wrapper.find('input').element.value === 'test').should.equal(true);
        wrapper.find(Icon).exists().should.equal(true);
        wrapper.setData({data: ''});
        wrapper.find(Icon).exists().should.equal(false);

        wrapper.setData({data: 'test1'});
        (wrapper.find('input').element.value === 'test1').should.equal(true);

        wrapper.find('input').setValue('test2');
        wrapper.vm.$nextTick(() => {
            wrapper.find('.display').text().should.equal('test2');
            done();
        })
    });
    it('清除按钮', () => {
        wrapper.find('[class$="clear"]').trigger('click');
        (wrapper.find('input').element.value === '').should.equal(true);
    })
});
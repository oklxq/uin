import Btn from '../src/components/button';
import {mount} from '@vue/test-utils'
import Icon from '../src/components/icon';
import Spin from '../src/components/spin';
import chai from 'chai';


chai.should();
describe('Btn 组件', () => {
    const wrapper = mount(Btn, {
        propsData: {
            icon: 'check',
        },
    });
    it('属性 icon', () => {
        wrapper.contains(Icon).should.equal(true);
    });
    wrapper.setProps({
        loading: true,
    });
    it('属性 loading', () => {
        wrapper.contains(Spin).should.equal(true);
    });
    wrapper.setProps({
        type: 'primary',
    });
    it('属性 type', () => {
        wrapper.classes('u-btn--primary').should.equal(true);
    });
    wrapper.setProps({
        htmlType: 'submit'
    });
    it('属性 htmlType', () => {
        wrapper.attributes('type').should.equal('submit');
    })
});
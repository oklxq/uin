
import { Select, Option as SelectOption } from './components/select';
import Input from './components/input';
import Icon from './components/icon';
import { Flex, FlexItem } from "./components/flex";
import { SplitPanel, SplitPanelItem } from "./components/split-panel";
import { Checkbox, CheckboxGroup } from "./components/checkbox";
import { Radio, RadioGroup } from "./components/radio";
import Slider from './components/slider';
import Button, { Group as BtnGroup } from './components/button';
import $Modal from './components/modal';
import { Table, Column as TableColumn, Pagination } from "./components/table";
import { Form, FormItem } from "./components/form";
import { Row, Col } from "./components/grid";
import { Tab, TabItem } from "./components/tab";
import Portal from './components/portal';
import Spin from './components/spin';
import LoadingBar from './components/loading-bar';
import Message from './components/message';

export default {
    Select,
    SelectOption,
    Input,
    Icon,
    Flex,
    FlexItem,
    SplitPanel,
    SplitPanelItem,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Button, BtnGroup,
    Modal: $Modal,
    Slider,
    Table,
    TableColumn,
    Pagination,
    Row,
    Col,
    Tab,
    TabItem,
    Spin,
    LoadingBar
}

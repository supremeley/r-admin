import './index.scss';

import { Menu } from '@arco-design/web-react';
import classNames from 'classnames';

import { page, PageItem } from '../index.data.ts';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const LayoutMenu = ({ collapse, onSwitchCollapse }: { collapse: boolean; onSwitchCollapse: () => void }) => {
  return (
    <Menu
      hasCollapseButton
      accordion={true}
      collapse={collapse}
      style={{ borderRadius: 4 }}
      theme='light'
      className='menu'
      onCollapseChange={onSwitchCollapse}
    >
      <LayoutMenuItem page={page} collapse={collapse}></LayoutMenuItem>
    </Menu>
  );
};

const LayoutMenuItem = ({ page, collapse = false }: { page: PageItem[]; collapse?: boolean }) => {
  const handleClick = (page: PageItem) => {
    navigate(page.path!);
  };

  const navigate = useNavigate();

  return page.map((item) => {
    return item.children?.length ? (
      <SubMenu
        key={item.title}
        title={
          <div className='menu-option'>
            {item.icon && <div className={classNames('font-size-4', item.icon, { 'mr-2': !collapse })} />}
            {!collapse && item.title}
          </div>
        }
      >
        <LayoutMenuItem page={item.children} collapse={collapse}></LayoutMenuItem>
      </SubMenu>
    ) : (
      <MenuItem key={item.title} className='menu-option' onClick={handleClick}>
        {item.icon && <div className={classNames('font-size-4', item.icon, { 'mr-2': !collapse })} />}
        {!collapse && item.title}
      </MenuItem>
    );
  });
};

export default LayoutMenu;

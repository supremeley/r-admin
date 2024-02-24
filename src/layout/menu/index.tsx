import './index.scss';

import { Menu } from '@arco-design/web-react';

import { useAppSelector } from '@/hooks';
import type { MenuItem } from '@/store/sys/interface';

// import { page } from '@/constants';

// import type { PageItem } from '../interface';

const { Item, SubMenu } = Menu;

const LayoutMenu = ({ collapse, onSwitchCollapse }: { collapse: boolean; onSwitchCollapse: () => void }) => {
  // const [selectedMenuIndex, setSelectedMenuIndex] = useState('');

  // const onClickMenu = (key: string) => {
  //   console.log(key, 'key');

  //   setSelectedMenuIndex(key);
  // };

  const sys = useAppSelector((state) => state.sys);
  const { menu } = sys;

  const LayoutMenuItem = ({ menuItem, collapse = false }: { menuItem: MenuItem[]; collapse?: boolean }) => {
    const handleClick = (menu: MenuItem) => {
      navigate(menu.path!);
    };

    const navigate = useNavigate();

    return menuItem.map((item) => {
      return item.children?.length ? (
        <SubMenu
          key={item.name}
          title={
            <div className='menu-option'>
              {item.icon && <div className={classNames('font-size-4', item.icon, { 'mr-2': !collapse })} />}
              {!collapse && item.title}
            </div>
          }
        >
          {LayoutMenuItem({ menuItem: item.children, collapse })}
        </SubMenu>
      ) : (
        <Item key={item.name} className='menu-option' onClick={() => handleClick(item)}>
          {item.icon && <div className={classNames('font-size-4', item.icon, { 'mr-2': !collapse })} />}
          {!collapse && item.title}
        </Item>
      );
    });
  };

  return (
    <Menu
      hasCollapseButton
      collapse={collapse}
      style={{ borderRadius: 4 }}
      theme='light'
      className='menu'
      levelIndent={16}
      // accordion={true}
      // selectedKeys={['home']}
      // defaultOpenKeys={['user']}
      // onClickMenuItem={onClickMenu}
      onCollapseChange={onSwitchCollapse}
    >
      {LayoutMenuItem({ menuItem: menu, collapse })}
    </Menu>
  );
};

export default LayoutMenu;

import './index.scss';

import { Menu } from '@arco-design/web-react';

import { page } from '@/constants/menu.ts';

import type { PageItem } from '../interface';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const LayoutMenu = ({ collapse, onSwitchCollapse }: { collapse: boolean; onSwitchCollapse: () => void }) => {
  // const [selectedMenuIndex, setSelectedMenuIndex] = useState('');

  // const onClickMenu = (key: string) => {
  //   console.log(key, 'key');

  //   setSelectedMenuIndex(key);
  // };

  const LayoutMenuItem = ({ page, collapse = false }: { page: PageItem[]; collapse?: boolean }) => {
    const handleClick = (page: PageItem) => {
      console.log(page, 'page');
      navigate(page.path!);
    };

    const navigate = useNavigate();

    return page.map((item) => {
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
          {LayoutMenuItem({ page: item.children, collapse })}
        </SubMenu>
      ) : (
        <MenuItem key={item.name} className='menu-option' onClick={() => handleClick(item)}>
          {item.icon && <div className={classNames('font-size-4', item.icon, { 'mr-2': !collapse })} />}
          {!collapse && item.title}
        </MenuItem>
      );
    });
  };

  return (
    <Menu
      hasCollapseButton
      // accordion={true}
      collapse={collapse}
      style={{ borderRadius: 4 }}
      theme='light'
      className='menu'
      levelIndent={16}
      // selectedKeys={['home']}
      // defaultOpenKeys={['user']}
      // onClickMenuItem={onClickMenu}
      onCollapseChange={onSwitchCollapse}
    >
      {LayoutMenuItem({ page, collapse })}
    </Menu>
  );
};

export default LayoutMenu;

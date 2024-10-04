import { EllipsisOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'

function ProductItem({item}) {
  return (
    <li>
        <Card
            style={ {width: 310,} }
            cover={ <img alt="example" src={item.images[0]} /> }
            actions={[
                <HeartOutlined className='!scale-[2]' key="ellipsis"/>,
                <ShoppingCartOutlined className='!scale-[2]' key="ellipsis"/>,
                <EllipsisOutlined className='!scale-[1.8]' key="ellipsis" />
            ]}>
            <Meta
            avatar={<Avatar src={item.category.image} />}
            title={item.title} description={ <p className='line-clamp-3 font-semibold'>{item.description}</p>} />
        </Card>
    </li>
  )
}

export default ProductItem

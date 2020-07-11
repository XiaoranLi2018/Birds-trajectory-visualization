# 鸟类迁徙路径及可视化
这个链接储存了应聘RCEES GIS开发维护工程师的笔试内容，里面包含了所有的相关代码以及最后的可视化成果。
该笔试要求根据所提供的四只鸟GPS信息，分析规律模拟生成1,000只鸟的飞行轨迹，并生成动态可视化成果。
## Getting Started
1. 复制这个链接到你的git hub或下载整个文件夹
2. 打开HTML文件来观赏可视化效果 （存在两个不同的HTML文件，因为使用了不同的Javascript库并且最后可视化成果不同），
3. 您可以通过运行名为‘preprocessing’的 Jupyter Notebook来了解数据预处理和生成1,000只鸟的过程和思路。
## Document Description
1. 最后生成的1,000只鸟的GPS数据以csv和Geojson的格式分别存储在名为data的文件夹中，转化成Geojson的格式是为了方便可视化。
2. 单独创建与HTML文件命名相同的Javascript文件是为了增加代码的可读性，运行时直接打开HTML文件即可看到可视化结果，如果您想了解具体的Javascript代码，可用任何文本编辑器打开。
3. library文件夹里面存储了可视化使用的库的js文件。
4. Jupyter Notebook里面记录了使用Python生成1,000只鸟轨迹和数据预处理的过程。
## Built With
* [P5 JS](https://mappa.js.org/docs/introduction-to-web-maps.html) - 用来构建mappa_index.html页面的JS库，它更多被用来做动画效果，因此制作网络地图常用的一些功能需要自己手动编写，较为复杂
* [CARTO VL](https://carto.com/developers/) - 用来构建carto_index.html可视化页面的JS库，专门用于分析地理空间数据并可视化，与最常使用的Mapbox与openLayer相似，里面有封装好的工具，可以使地图与用户的互动更为简单（时间滑块，点击弹出窗口等）
* [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) - 主要用于添加底图
## Reminder
1. 如浏览器不能直接打开HTML文件，可用visual studio code中的live servre来打开
2. 由于没有找到每个人都有权限的存储数据的服务器，并且CARTO VL不支持在使用本地数据，因此我将Geojson文件上传到了CARTO VL自带的数据库中，但其有效期只有14天，如果您不能正确加载可视化页面可能是数据失效的原因。如有此情况发生，请告知我，我会提供您新的用户名和API Key。
3. carto_index.html可视化成果使用点来表示运动轨迹，点的大小与鸟的飞行速度有关，并附加了时间轴、点击出现鸟类信息的弹窗等交互效果。由于鸟类飞行较为密集彼此轨迹会有重叠，popup window在缩放比例较小时可能会出现延迟，您可以将地图比例尺调大来体验该功能。
4. mappa_index.html可视化成果使用线来追踪鸟类迁徙，但到目前为止我的轨迹与鸟的实时飞行状态并不能做到即时显示，会有延迟，暂时未找到更好的解决方法。
5. 上传两种可视化成果时为了您了解并比较各种库的特点。
## Authors
* **Xiaoran Li** - *Initial work* - [UMN MGIS](https://github.com/XiaoranLi2018)

(() => {
const {lesson:L,track:T}=CourseKit;
const base='https://docs.ros.org/en/jazzy/';
const cli='Tutorials/Beginner-CLI-Tools/';
const client='Tutorials/Beginner-Client-Libraries/';
const ref=path=>['ROS 2 Jazzy 官方文档',base+path+'.html'];
const raw=path=>['ROS 官方文档源码（备用）','https://github.com/ros2/ros2_documentation/blob/jazzy/source/'+path+'.rst'];
const refs=path=>[ref(path),raw(path)];
const pre='Ubuntu 24.04；先学 Linux 基础与 Python 面向对象。每个新终端均需 source /opt/ros/jazzy/setup.bash。';
const R=(title,goal,theory,code,explain,expected,task,answer,path)=>L(title,goal,theory,code,explain,expected,task,answer,refs(path),'Ubuntu · Bash',pre);
window.COURSES.push(T('ros2','ROS 2 机器人基础','ros2','把节点、相机、坐标系、模型与控制串起来，读懂灵巧手的系统。',['Jazzy / Ubuntu 24.04','15 节讲解与练习','先仿真'],[
R('ROS 2 在三个赛项中的位置','知道什么时候需要 ROS，什么时候不需要。','ROS 2 是机器人软件通信与开发工具集合，不是安装在电脑上的另一套操作系统。2D 原生球队用自己的协议，FIRA 用自己的 Windows 平台，两者入门都无需 ROS。灵巧手常用 ROS 2 组织相机、机械臂、三指手和规划组件。','本区学习顺序：安装 → 通信图 → 参数/QoS → 包与 Python 节点 → launch → tf2 → 模型 → 仿真 → 控制 → 相机 → 记录','节点是运行中的功能单元；包是代码与资源的组织单元；工作空间容纳一个或多个包。节点可在不同进程中运行，并不是一个包必须只有一个节点。后文示例全部针对仿真或普通教学数据。','先能区分 node、package、workspace。不要为了运行 FIRA 去安装 Gazebo，也不要用 ROS 安装成功代替对赛事平台的检查。','相机节点和记录节点可以属于同一个包吗？','可以。包是分发和构建单位，节点是运行时功能角色；两者没有一一对应限制。','Concepts/Basic/About-Nodes'),
R('从公开软件源完整安装 Jazzy','在新 Ubuntu 上配置来源、安装 ROS 并验收通信。','本节仅面向 Ubuntu 24.04。先设置 UTF-8 与 Universe，再从 ros-infrastructure 的官方 release 安装软件源配置包，最后安装桌面版。这里使用官方文档源码中的当前 ros2-apt-source 方法；若来源包命名变化，以链接中的 Jazzy 安装页为准。',[
['Ubuntu · Bash · 系统与语言','cat /etc/os-release\nsudo apt update\nsudo apt install locales software-properties-common curl\nsudo locale-gen en_US en_US.UTF-8\nsudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8\nexport LANG=en_US.UTF-8\nsudo add-apt-repository universe'],
['Ubuntu · Bash · 官方 ROS 软件源',`export ROS_APT_SOURCE_VERSION=$(curl -fsSL -o /dev/null -w '%{url_effective}' https://github.com/ros-infrastructure/ros-apt-source/releases/latest | awk -F/ '{print $NF}')
echo "$ROS_APT_SOURCE_VERSION"
curl -fL -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/\${ROS_APT_SOURCE_VERSION}/ros2-apt-source_\${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo \${UBUNTU_CODENAME:-\${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb`.replace(/^\+/gm,'')],
['Ubuntu · Bash · 安装','sudo apt update\nsudo apt upgrade\nsudo apt install ros-jazzy-desktop ros-dev-tools\nsource /opt/ros/jazzy/setup.bash\necho "$ROS_DISTRO"'],
['Ubuntu · Bash · 终端 A','source /opt/ros/jazzy/setup.bash\nros2 run demo_nodes_cpp talker'],
['Ubuntu · Bash · 终端 B','source /opt/ros/jazzy/setup.bash\nros2 run demo_nodes_py listener']],
'curl 从官方 HTTPS 获取配置包；$(...) 把命令输出作为变量值；os-release 提供 noble 发行版代号。先看版本变量确实为 release 标签且下载无错误，再安装；不要继续安装 404 错误页。upgrade 会列出系统更新，阅读确认后再继续。','ROS_DISTRO 应为 jazzy；A 发布文本，B 打印收到的内容。找不到 ros2 先 source。依赖冲突时检查官方提示的 noble-updates/noble-backports 源；不要混加 Humble 或其他发行版的源。','停止两端后，新开终端，为什么又要 source？','环境只属于该终端及子进程，安装不会自动改写已经运行的 shell。source 将 ROS 命令与库路径引入当前环境。','Installation/Ubuntu-Install-Debs'),
R('节点、话题、消息类型与命令行观察','通过 turtlesim 看见 ROS 运行图。','先停止上一课 talker/listener。终端 A 启动小海龟仿真，B 列出节点和话题，C 用键盘控制。键盘窗口需要获得焦点；话题是数据通道，消息类型定义每条数据的字段。',[
['Ubuntu · Bash · 终端 A','ros2 run turtlesim turtlesim_node'],
['Ubuntu · Bash · 终端 B','ros2 node list\nros2 node info /turtlesim\nros2 topic list -t\nros2 topic info /turtle1/cmd_vel\nros2 interface show geometry_msgs/msg/Twist\nros2 topic echo /turtle1/pose'],
['Ubuntu · Bash · 终端 C','ros2 run turtlesim turtle_teleop_key']],
'run 的前两项是包名与可执行程序名；topic echo 持续打印数据，用 Ctrl+C 退出。Twist 含 linear 和 angular 两组三维分量；真实机器人常按米/秒和弧度/秒解释，小海龟只是教学仿真，不能直接把它的数值映射到实机。','键盘方向键使小海龟运动，pose 变化。界面不动先确认焦点与节点运行；看不到节点先检查终端环境和 ROS_DOMAIN_ID。','话题名相同但两端消息类型不同，能交换数据吗？','不能作为同一种话题数据正常匹配。先核对名称，再核对类型；随后还要检查 QoS、域和网络。','Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics'),
R('服务、动作与接口：何时用哪一种通信','根据任务持续时间选择 topic、service 或 action。','话题适合连续观测；服务适合一次请求与响应；动作适合耗时任务，包含目标、反馈、结果，并支持取消。短操作可用服务，长轨迹执行通常使用动作。msg 定义数据，srv 分请求与响应，action 分目标/结果/反馈。保持 turtlesim 与键盘节点运行。',`ros2 service list -t
ros2 service type /clear
ros2 service call /clear std_srvs/srv/Empty "{}"
ros2 action list -t
ros2 interface show turtlesim/action/RotateAbsolute
ros2 action send_goal /turtle1/rotate_absolute turtlesim/action/RotateAbsolute "{theta: 1.57}" --feedback`.replace(/^\+/gm,''),
'clear 擦除路径但不重置海龟位置；Empty 没有请求字段。RotateAbsolute 用 theta 指定目标朝向，--feedback 显示执行中信息。在机器人中应先用 interface show 看真实类型，不靠记忆猜字段名。','clear 后轨迹被清除；旋转动作出现目标接受、反馈及结果。若服务等待很久，先检查提供者节点；不要把等待服务的终端关掉又反复发送相同请求。','为什么“执行 5 秒轨迹”适合 action 而不是长时间占住 service？','客户端需要进度、失败反馈和取消入口；action 已提供这套生命周期。service 更适合短而明确的一次响应。','Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions'),
R('参数、命名空间、Domain 与 QoS','解释节点可见但收不到数据的常见原因。','参数保存节点配置；命名空间区分重复节点；ROS_DOMAIN_ID 隔离发现域。QoS 是通信约定，reliability、durability、history/depth 等策略需兼容。相机常用 best_effort，要求 reliable 的订阅者不能接收 best_effort 发布者。',[
['Ubuntu · Bash · 保持 turtlesim 运行','ros2 param list /turtlesim\nros2 param get /turtlesim background_r\nros2 param set /turtlesim background_r 180\nros2 service call /clear std_srvs/srv/Empty "{}"\nros2 topic info /turtle1/pose --verbose'],
['Ubuntu · Bash · 新终端示例，独立第二只海龟','ros2 run turtlesim turtlesim_node --ros-args -r __ns:=/practice -r __node:=sim']],
'param get/ set 针对具体节点；--ros-args 后是 ROS 参数，-r 做重映射。第二个节点位于 /practice/sim。修改域变量只影响之后启动的进程；需要通信的两端使用相同域。history/depth 是缓存策略，不是发送频率。','第一只海龟背景颜色变化，第二个节点不与 /turtlesim 重名。无数据先检查类型、QoS 与域，不立即重装。域一致也不保证跨机器网络可达。','发布者 best_effort，订阅者 reliable，怎样排查？','ros2 topic info --verbose 查看端点 QoS；确认数据允许丢包后，让订阅者使用兼容的 best_effort，例如相机的 sensor_data profile。不要盲目把所有可靠性配置改低。','Concepts/Intermediate/About-Quality-of-Service-Settings'),
R('工作空间、包、rosdep 与 colcon','创建属于自己的 ROS Python 包，而不是复制作者工程。','安装是 underlay，自己的工作空间是 overlay。src 放源码，build 是构建中间产物，install 是可被 ROS 发现的安装结果，log 保存构建日志。开发一个包前先了解依赖从哪里来。',`source /opt/ros/jazzy/setup.bash
mkdir -p ~/robot_ws/src
cd ~/robot_ws/src
ros2 pkg create --build-type ament_python --node-name talker learning_nodes --dependencies rclpy std_msgs
cd ~/robot_ws
sudo rosdep init
rosdep update
rosdep install --from-paths src --ignore-src -r -y
colcon build --symlink-install --packages-select learning_nodes
source install/setup.bash
ros2 pkg prefix learning_nodes`.replace(/^\+/gm,''),
'rosdep init 只在整台机器首次配置时运行一次，若提示已有默认源，跳过这行。rosdep 按 package.xml 解析依赖；colcon 按包构建；source install/setup.bash 加载本次 overlay。--symlink-install 方便 Python 修改，但安装配置变化仍要重建。','pkg prefix 指向 ~/robot_ws/install 中的 learning_nodes。package not found 查是否构建成功和 source overlay；构建时建议新终端仅 source underlay，避免旧 overlay 干扰。','仅 cd 到 src 目录，ROS 就会发现这个包吗？','不会。目录位置不是注册。需要构建生成安装布局并 source 对应 setup.bash；ros2 pkg prefix 能确认实际发现的是哪一份。','Tutorials/Beginner-Client-Libraries/Creating-Your-First-ROS2-Package'),
R('写一个完整 Python 发布节点','把继承、定时器、参数和消息发布对应到代码。','用编辑器打开 ~/robot_ws/src/learning_nodes/learning_nodes/talker.py，以以下代码替换。pkg create --node-name talker 已为这个模块创建入口，不需要猜 setup.py。示例只发布字符串。',[
['Python · learning_nodes/talker.py',`import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class PracticeTalker(Node):
    def __init__(self):
        super().__init__("practice_talker")
        self.declare_parameter("label", "training")
        self.publisher = self.create_publisher(String, "practice/status", 10)
        self.count = 0
        self.timer = self.create_timer(1.0, self.publish_status)

    def publish_status(self):
        label = self.get_parameter("label").value
        message = String()
        message.data = f"{label}: {self.count}"
        self.publisher.publish(message)
        self.get_logger().info(message.data)
        self.count += 1

def main(args=None):
    rclpy.init(args=args)
    node = PracticeTalker()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == "__main__":
    main()`.replace(/^\+/gm,'')],
['Ubuntu · Bash','cd ~/robot_ws\ncolcon build --symlink-install --packages-select learning_nodes\nsource install/setup.bash\nros2 run learning_nodes talker'],
['Ubuntu · Bash · 另一个已 source 的终端','ros2 topic echo /practice/status']],
'super().__init__ 初始化 Node 基类。create_publisher 给定消息类型、话题与队列深度；create_timer 每秒安排回调；传 self.publish_status 而不是 self.publish_status()。spin 让执行器处理定时器和通信事件；finally 清理节点。','应每秒出现 training: 0、training: 1 等。没有输出时检查运行的是新构建模块；ros2 topic list 确认话题名。程序不直接访问任何设备。','把周期从 1.0 改成 0.5，频率如何改变？为什么不用 while True + sleep 代替？','周期减半约为 2Hz；定时器由执行器调度。长时间堵住回调或在初始化中死循环会妨碍其他事件处理，普通循环不是 ROS 事件循环的等价替代。','Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber'),
R('订阅、回调与执行器：从消息变成数据','写出完整订阅程序，理解回调不能长期阻塞。','保留发布节点运行。创建 ~/robot_ws/src/learning_nodes/learning_nodes/listener.py，保存下面的独立程序。本节直接用系统 python3 运行它；若希望以后 ros2 run，需要另在 setup.py 注册可执行入口并重新构建。',[
['Python · listener.py',`import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class PracticeListener(Node):
    def __init__(self):
        super().__init__("practice_listener")
        self.subscription = self.create_subscription(
            String, "practice/status", self.receive, 10)
        self.latest = None

    def receive(self, message):
        self.latest = message.data
        self.get_logger().info(f"收到：{self.latest}")

def main():
    rclpy.init()
    node = PracticeListener()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        if rclpy.ok():
            rclpy.shutdown()

if __name__ == "__main__":
    main()`.replace(/^\+/gm,'')],
['Ubuntu · Bash','source /opt/ros/jazzy/setup.bash\npython3 ~/robot_ws/src/learning_nodes/learning_nodes/listener.py']],
'订阅时声明回调，数据到来才调用 receive；message 是 String 对象，实际文本在 .data。把订阅句柄存在实例上，便于维护生命周期。默认单线程执行器中，一个回调耗时会推迟其他回调。','打印连续“收到”。收不到时看两个进程是否都在运行，以及话题、消息类型与域是否一致。相机大图处理通常要设计工作队列，不能只把所有耗时任务塞进一个回调。','回调中 sleep(5)，而消息每秒一条，会发生什么？','处理速度跟不上，延迟和丢弃取决于队列与 QoS。应先测耗时，再考虑缩短工作、独立处理线程/节点或合适的回调组，不能只无限增大队列。','Concepts/Intermediate/About-Executors'),
R('launch、YAML 参数与可重复启动','把节点名、参数与启动顺序写入可读配置。','前置：发布节点已构建且 source overlay。创建 ~/robot_ws/practice.launch.py。launch 是 Python 描述，不是 bash 命令拼接；参数通过类型明确的字典传给节点。',[
['Python · ~/robot_ws/practice.launch.py',`from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(package="learning_nodes", executable="talker",
             name="lesson_talker", namespace="classroom",
             parameters=[{"label": "launch-demo"}], output="screen")
    ])`.replace(/^\+/gm,'')],
['Ubuntu · Bash','source ~/robot_ws/install/setup.bash\nros2 launch ~/robot_ws/practice.launch.py'],
['YAML · 参数文件结构说明（可保存为 ~/robot_ws/practice.yaml）','/classroom/lesson_talker:\n  ros__parameters:\n    label: yaml-demo'],
['Ubuntu · Bash · 另一终端观察','ros2 topic echo /classroom/practice/status\nros2 param get /classroom/lesson_talker label']],
'namespace 把相对话题 practice/status 变为 /classroom/practice/status；name 覆盖节点名称。若改用 YAML，将 parameters 列表中的字典替换成参数文件绝对路径（字符串）；也可用 ros2 run ... --ros-args --params-file 文件路径。正式包分发需在 setup.py 的 data_files 安装 launch/config，本例用文件路径启动来避免隐藏安装步骤。','输出 launch-demo 的计数。YAML 若不生效，先核对全限定节点名与 ros__parameters 缩进；前一课节点要先停，避免同名或多发布者干扰观察。','为何参数文件里写 /practice_talker，而 launch 改名为 lesson_talker 后可能无效？','参数配置按节点名称匹配；实际名已经变为 /classroom/lesson_talker，需要对应更新或有意使用受控通配规则。','Tutorials/Intermediate/Launch/Launch-Main'),
R('tf2：坐标系、时间、四元数与标定','知道位姿必须带坐标系和时刻，能查询一个已知变换。','相机看到的位置通常相对 camera_frame，而机械臂执行相对 base_link。tf2 管理带时间的变换树；一个子坐标系只能有一个直接父系。静态安装关系可用静态变换演示，真实相机外参必须经过标定，不能拿本节示例值替代。',[
['Ubuntu · Bash · 终端 A','sudo apt install ros-jazzy-tf2-ros ros-jazzy-tf2-tools\nros2 run tf2_ros static_transform_publisher --x 0.1 --y 0 --z 0.2 --roll 0 --pitch 0 --yaw 0 --frame-id base_link --child-frame-id practice_camera'],
['Ubuntu · Bash · 终端 B','ros2 run tf2_ros tf2_echo base_link practice_camera']],
'本节示例将相机原点放在基座 x=0.1m、z=0.2m，轴向一致；变换查询中应看到对应平移。旋转消息常用四元数 x/y/z/w，单位四元数是 0/0/0/1，不能把欧拉角直接塞入四元数字段。光学相机轴约定与机器人基座可能不同。','tf2_echo 打印变换。找不到 frame 查节点是否启动；Extrapolation 通常要检查时间戳与 use_sim_time；要转换目标点应使用带 frame_id/time 的消息与 tf2 接口，不能只手加偏移用于任意旋转情况。','相机读到点 (0,0,1)，按本节无旋转示例它在基座哪里？','(0.1,0,1.2)m。这个结果只适用于本节假设的轴向一致静态平移；有旋转时必须做完整刚体变换。','Tutorials/Intermediate/Tf2/Introduction-To-Tf2'),
R('URDF、xacro、关节状态与 RViz','理解模型树、单位和可视化数据来源。','URDF 的 link 表示刚性部件，joint 连接两个 link；revolute 有旋转角限制，continuous 连续转动，prismatic 平移，fixed 不动。visual 管外观，collision 管碰撞，inertial 管质量与惯量。xacro 用宏和参数复用模型。','sudo apt install ros-jazzy-urdf-tutorial ros-jazzy-xacro ros-jazzy-joint-state-publisher-gui\nros2 launch urdf_tutorial display.launch.py model:=urdf/06-flexible.urdf\n# 上面保持运行，在另一个已 source 的终端执行：\nros2 topic echo /joint_states --once\nros2 topic list | grep tf','JointState 的 name、position 等数组按索引对应；旋转位置通常为弧度，平移为米。robot_state_publisher 根据 URDF 与关节状态发布 tf；joint_state_publisher_gui 提供教学关节输入。RViz Fixed Frame 选模型树的有效根坐标系。','滑块改变显示姿态，/joint_states 有数据。mesh 找不到检查 package:// 路径和资源安装；No transform 查关节名与 tf 树。不完整的惯量不会因为 RViz 能显示就自动正确。','若关节数组 name 与 position 的顺序错位，会发生什么？','角度被分配到错误关节，显示或控制就会错误。不能仅凭数组长度相同判断对应关系，应按真实名称建立映射。','Tutorials/Intermediate/URDF/URDF-Main'),
R('Gazebo、ROS 桥接与仿真时钟','理解两个消息系统之间的桥，并避免时钟混用。','Gazebo 的 Transport 与 ROS 话题不是同一总线。ros_gz_bridge 在支持的类型之间转换；先启动 Gazebo 示例世界，观察 Gazebo 是否发布 /clock。ROS 节点只有 use_sim_time=true 才会使用 ROS /clock；仿真暂停时时间也可能不前进。',[
['Ubuntu · Bash · 终端 A','sudo apt install ros-jazzy-ros-gz\ngz sim shapes.sdf'],
['Ubuntu · Bash · 终端 B','gz topic -l\nros2 run ros_gz_bridge parameter_bridge "/clock@rosgraph_msgs/msg/Clock[gz.msgs.Clock"'],
['Ubuntu · Bash · 终端 C','ros2 topic echo /clock --once']],
'桥接语法中 @ 后接 ROS 类型，[ 表示 Gazebo → ROS，后面是 Gazebo 类型；双引号避免 shell 误处理方括号。世界可能只发布 /world/世界名/clock，先用 gz topic -l 确认；这时桥接该真实名称并用 -r 真实名称:=/clock 重映射。','播放仿真后 ROS 能收到时钟。只创建桥不会自动生成相机或控制器；桥的消息类型必须受支持。后续依赖仿真时间的节点在 launch 参数中明确配置 use_sim_time。','tf 数据用仿真时间，查询端用电脑真实时间，会怎样？','两个时间域不一致会造成变换查询超时或外推错误。统一相关节点的 use_sim_time，并确认桥接 /clock 正在发布。','Concepts/Intermediate/About-ROS-Interfaces'),
L('ros2_control、关节轨迹与 MoveIt 2','把“规划一条轨迹”和“执行一条轨迹”分开理解。','MoveIt 2 根据机器人模型、运动学和规划场景生成路径；ros2_control 的 controller_manager 管理控制器与硬件接口；轨迹控制器把轨迹转成关节命令。joint_state_broadcaster 发布反馈。先使用官方 RRBot 假硬件示例学习，禁止把本课命令用于真实机械臂。',[
['Ubuntu · Bash · 安装通用组件','sudo apt install ros-jazzy-ros2-control ros-jazzy-ros2-controllers ros-jazzy-moveit'],
['Ubuntu · Bash · 获取官方仿真示例','mkdir -p ~/control_ws/src\ncd ~/control_ws/src\ngit clone -b jazzy https://github.com/ros-controls/ros2_control_demos.git\ncd ~/control_ws\nsource /opt/ros/jazzy/setup.bash\nrosdep install --from-paths src --ignore-src -r -y\ncolcon build --symlink-install\nsource install/setup.bash\nros2 launch ros2_control_demo_example_1 rrbot.launch.py'],
['Ubuntu · Bash · 新终端 source 两层环境后','source /opt/ros/jazzy/setup.bash\nsource ~/control_ws/install/setup.bash\nros2 control list_controllers\nros2 control list_hardware_interfaces\nros2 action list -t']],
'只在独立 control_ws 中构建官方 Jazzy 分支。先观察控制器是否 active、接口是否存在；实际控制器可能使用 position/velocity/effort 不同接口。FollowJointTrajectory 通常包含关节名、轨迹点、每点位置与 time_from_start，必须与机器人及控制器配置对应。','RRBot 假硬件示例应启动控制管理器；实际显示与激活名称以下方官方步骤为准。包不存在先确认分支和 rosdep 输出。MoveIt 规划成功不等于硬件执行成功，还需要控制器映射、时间参数与状态反馈。','能在 RViz 拖动目标，但实机不动，首先要检查什么链路？','检查是否只是规划预览、控制器是否激活、执行动作接口是否匹配、硬件连接与反馈是否正常；不要直接反复发送更大的位移。',[['ros2_control 官方 RRBot 教程','https://control.ros.org/jazzy/doc/ros2_control_demos/example_1/doc/userdoc.html'],['MoveIt 2 官方教程入口','https://moveit.picknik.ai/']],'Ubuntu · Bash',pre+'已完成 rosdep 初始化；独立假硬件示例，不连接设备。'),
L('相机、深度、CameraInfo 与 cv_bridge','解释灵巧手感知链里每种数据的含义。','Image 包含图像与编码，CameraInfo 给出内参、畸变与尺寸，深度图提供像素距离信息。cv_bridge 把 ROS 图像与 OpenCV 数组转换；它不自动做标定。相机内参把像素和光线联系起来，外参说明相机相对机械臂的位置与朝向。',[
['Ubuntu · Bash · 工具安装与验证','sudo apt install ros-jazzy-cv-bridge ros-jazzy-image-tools ros-jazzy-image-transport ros-jazzy-rqt-image-view python3-opencv python3-numpy\npython3 -c "from cv_bridge import CvBridge; import cv2; print(cv2.__version__)"'],
['Ubuntu · Bash · 终端 A，生成公开教学图像','ros2 run image_tools cam2image --ros-args -p burger_mode:=true'],
['Ubuntu · Bash · 终端 B','ros2 topic list -t\nros2 topic info /image --verbose\nros2 run rqt_image_view rqt_image_view']],
'burger_mode 生成教学图像，不要求 USB 相机。在查看器里选择实际图像话题。真实设备的深度单位需读驱动文档：16UC1 可能按毫米，32FC1 可能按米，不能只猜类型。计算针孔模型 X=(u-cx)Z/fx、Y=(v-cy)Z/fy 前要完成去畸变、RGB/深度对齐及单位确认。','能显示教学图像，cv_bridge 可导入。本例无真实深度和 CameraInfo，不构成标定验收。实际相机无图像时还需检查 QoS、编码、驱动、话题与时间戳；无效深度 0/NaN 不可当目标坐标。','得到相机系三维点后，给机械臂之前还缺什么？','至少需要相机到基座的外参、tf2 时间一致的变换、目标姿态与末端偏移、工作空间/碰撞检查。不能只把像素坐标传给机械臂。',[['ROS 官方 cv_bridge','https://github.com/ros-perception/vision_opencv'],['ROS 官方 image_tools','https://github.com/ros2/demos/tree/jazzy/image_tools'],['CameraInfo 接口','https://docs.ros.org/en/jazzy/p/sensor_msgs/msg/CameraInfo.html']],'Ubuntu · Bash',pre),
R('rosbag、日志与系统排错综合练习','记录可重复观测，按证据定位问题。','前置：重新运行第 7 课 practice_talker，并保持话题 /practice/status 发布。rosbag 保存传输数据，帮助比较和回放；它不是相机标定文件，也不会保存所有外部设备内部状态。',`mkdir -p ~/robot-recordings
cd ~/robot-recordings
ros2 topic hz /practice/status
# Ctrl+C 停止频率观察后：
ros2 bag record -o practice_take_01 /practice/status
# 录制几秒后按 Ctrl+C，然后：
ros2 bag info practice_take_01
# 停止原发布节点，再在这个终端回放：
ros2 bag play practice_take_01`.replace(/^\+/gm,''),
'录制目录必须是新名称，第二次改 take_02。另一个终端用 topic echo 观察回放；回放时停止原发布者，避免混入实时数据。需要图像实验时也记录 camera_info、tf/tf_static 与必要时钟，注意磁盘容量和 QoS。','bag info 应显示消息类型、话题和数量。没有消息先检查发布者、话题拼写与域；丢帧还要检查磁盘和 QoS。构建日志在工作空间 log，节点日志通常在 ~/.ros/log。','写出“节点存在但相机看不到”的排错顺序。','先看 node/topic list，再查类型与发布频率，查 QoS 和域、查看编码及时间戳，最后查显示工具与驱动日志。记录你观察到的证据，不把某个节点存在等同于整条链成功。','Tutorials/Beginner-CLI-Tools/Recording-And-Playing-Back-Data/Recording-And-Playing-Back-Data')
],'<circle cx="50" cy="45" r="13"/><circle cx="15" cy="17" r="6"/><circle cx="85" cy="17" r="6"/><circle cx="15" cy="75" r="6"/><circle cx="85" cy="75" r="6"/><path d="m20 21 20 16m20 0 20-16M20 71l20-18m20 0 20 18"/>','这条路线覆盖比赛基础涉及的通信、模型、坐标、仿真、控制和感知；自主抓取策略与真实设备标定不在这里展开。'));
})();

(() => {
const {lesson:L,track:T}=CourseKit;
const linux=['Ubuntu 官方终端入门','https://ubuntu.com/tutorials/command-line-for-beginners'];
const bash=['GNU Bash 手册','https://www.gnu.org/software/bash/manual/html_node/index.html'];
const core=['GNU 常用命令手册','https://www.gnu.org/software/coreutils/manual/coreutils.html'];
const py=chapter=>['Python 3.12 官方教程','https://docs.python.org/zh-cn/3.12/tutorial/'+chapter+'.html'];
const ros=path=>['ROS 2 Jazzy 官方教程','https://docs.ros.org/en/jazzy/'+path+'.html'];
const raw=path=>['官方文档源码（网页受限时可读）','https://github.com/ros2/ros2_documentation/blob/jazzy/source/'+path+'.rst'];
const cli='Tutorials/Beginner-CLI-Tools/';
const client='Tutorials/Beginner-Client-Libraries/';
const mono='<rect x="8" y="16" width="84" height="60" rx="4"/><path d="m22 34 12 12-12 12m23 0h25"/>';
window.COURSES.push(T('linux','Linux 常用指令','linux','从“我在哪个目录”到“为什么程序没启动”，读懂终端里的每一步。',['零基础','Ubuntu / Bash','8 节实操'],[
L('认识终端：命令、参数与帮助','区分 shell、命令和程序输出，建立安全的练习目录。','终端是输入输出窗口，Bash 是解释命令的 shell。提示符中的 $ 通常表示普通用户，教程中不要把它一起复制。空格分隔命令与参数；大小写敏感，中文引号不能代替英文引号。','whoami\npwd\nmkdir -p ~/terminal-lab\ncd ~/terminal-lab\nprintf "Hello, terminal\\n"\nls --help','whoami 查看用户名；pwd 打印当前绝对路径；mkdir -p 创建目录；cd 改变当前位置；printf 输出文本。--help 查看长选项说明。也可 man ls 打开手册，按 q 退出；Tab 补全、↑ 回看历史、Ctrl+C 取消当前前台命令。','pwd 最后应显示你的家目录下 terminal-lab。command not found 意味着命令未找到；提示符回到当前行才表示命令结束，不能把输出行继续当命令执行。','预测 cd .. 后 pwd 会显示什么，并实际验证。','.. 是父目录，所以从 ~/terminal-lab 返回家目录。cd 只改变当前 shell 的位置，不会移动任何文件。',[linux,bash]),
L('路径与目录：pwd、ls、cd、find','能在家目录、相对路径与绝对路径之间定位文件。','/ 是文件系统根，~ 是当前用户家目录，. 是当前位置，.. 是父目录。绝对路径从 / 开始；相对路径从当前目录开始。Linux 的 /home 与 Windows 的 C:\\ 不是同一种写法。','cd ~/terminal-lab\nmkdir -p notes/day1\ntouch notes/day1/readme.txt\nls -lah\ncd notes\npwd\nls day1\nfind ~/terminal-lab -name "*.txt"','ls -l 展示详细信息，-a 包括隐藏文件，-h 使大小易读。touch 创建空文件或更新时间；find 按名字搜索。引号保护 *.txt，交给 find 而不是先被 shell 展开。','应找到 readme.txt。No such file or directory 先用 pwd 核对位置，再用 ls 核对拼写，不要立刻重新安装工具。','从 notes 目录进入 day1，再回到 terminal-lab，分别写相对路径和绝对路径。','进入用 cd day1；返回可用 cd ../..；绝对形式用 cd ~/terminal-lab。相对路径解释依赖当前所在位置。',[linux,core]),
L('文件操作与编辑：cp、mv、rm、nano','能够创建、备份、重命名并谨慎删除练习文件。','文件扩展名通常是约定，不决定内容。先备份再修改配置；终端删除不会自动进入桌面回收站。示例只操作自己创建的 terminal-lab 下的文件。','cd ~/terminal-lab\nprintf "team=Learner\\n" > config.txt\ncp config.txt config.backup.txt\nmv config.backup.txt old-config.txt\nnano config.txt\ncat config.txt\nrm -i old-config.txt','> 创建或覆盖文件；cp 复制，mv 移动或重命名。nano 中改内容后 Ctrl+O 保存、Enter 确认文件名、Ctrl+X 退出。rm -i 每次删除前询问；目录为空才用 rmdir，复制目录需 cp -r。','cat 显示编辑后的内容；rm 询问时看清文件名，再输入 y 或 n。不要给新手练习使用 sudo rm -rf，也不要对不理解的通配符执行删除。','为什么编辑前做 cp 备份比修改后才备份更有用？','修改后备份只能得到已改变的内容；修改前副本才能帮助恢复。mv 则会移走原名称，不等于生成备份。',[linux,core]),
L('查看与筛选：cat、less、head、tail、grep','从较长的日志中定位错误，而不是盯着最后一行。','cat 适合小文件；less 分页查看大文件；head/tail 查看开头和结尾。grep 用文本模式找匹配行，-n 显示行号，-i 忽略大小写。程序最后的失败摘要不一定是最早的根因。','cd ~/terminal-lab\nprintf "INFO start\\nERROR camera missing\\nINFO stop\\n" > run.log\ncat run.log\ngrep -n "ERROR" run.log\nhead -n 1 run.log\ntail -n 2 run.log\nless run.log','less 中 /ERROR 搜索、n 下一个、q 退出。tail -f run.log 持续跟踪新增内容，Ctrl+C 退出。grep 没有匹配通常返回状态 1，而不一定是程序故障。','grep 应显示第 2 行 camera missing。真实安装日志里先定位最早的依赖、头文件或连接错误，再阅读它前后的上下文。','只想持续查看新日志，应该用 cat 还是 tail -f？','用 tail -f。cat 读完当下文件就退出；tail -f 保持观察追加内容。它不会主动触发程序写日志。',[core,bash]),
L('重定向、管道与条件执行','解释 >、>>、2>、|、&&，保存诊断信息。','命令通常有标准输入、标准输出和标准错误三个通道。管道把前一个命令的标准输出交给下一个；错误流默认不会进入管道。&& 只在前一命令成功时继续，适合分阶段构建。','cd ~/terminal-lab\nprintf "INFO one\\nERROR two\\n" > pipe.log\nprintf "INFO three\\n" >> pipe.log\ncat pipe.log | grep "INFO"\nls no-such-file 2> error.log\ncat error.log\nmkdir -p build && printf "目录已准备\\n"','> 覆盖，>> 追加，2> 保存错误。command > out.log 2>&1 将输出和错误合并到同一文件，重定向顺序有意义。不要用一长串命令掩盖中途失败；第一次学习时逐条观察。','INFO 筛选得到两行，error.log 包含不存在文件的错误。构建时可保存日志，但要同时检查退出状态：紧接命令运行 echo $?，0 通常表示成功。','如果用 sudo echo text > 系统文件，为什么仍可能权限不足？','重定向由当前 shell 在 sudo 启动前处理。初学阶段应编辑自己目录中的练习文件；需要修改系统配置时再学习 sudo tee 或管理员编辑工具的明确用途。',[bash]),
L('权限、sudo、软件包与压缩包','理解可执行位、系统安装和解压之间的关系。','ls -l 的 rwx 分别是读、写、执行，按所有者/组/其他人三组排列。sudo 临时使用管理员权限，不能治好路径拼错或缺失依赖。apt 安装系统软件；tar/unzip 只解包，不会自动编译安装。','cd ~/terminal-lab\nprintf \'#!/usr/bin/env bash\\nprintf "脚本运行\\n"\\n\' > hello.sh\nls -l hello.sh\nchmod u+x hello.sh\n./hello.sh\ntar -czf notes.tar.gz notes\ntar -tzf notes.tar.gz\napt show git','chmod u+x 给当前文件所有者增加执行权限；./ 指当前目录中的程序。tar -c 创建、-z gzip 压缩、-f 指定文件，-t 只列内容；解压使用 tar -xzf 文件名。安装 Git 可用 sudo apt update 后 sudo apt install git。','脚本应输出“脚本运行”。Permission denied 先检查可执行位；不要直接 chmod 777。压缩包先看列表，再选择空目录解压，避免覆盖工作文件。','bash hello.sh 与 ./hello.sh 有什么区别？','前者显式交给 Bash 读取，不要求文件本身有执行位；后者由操作系统执行文件，需要执行权限，并由首行 shebang 指定解释器。',[core,bash]),
L('进程与网络：ps、pgrep、kill、ss、curl','能定位自己运行的程序，检查端口和下载是否成功。','进程是运行中的程序，PID 是它本次运行的编号。先识别进程再停止；Ctrl+C 向前台程序请求中断。端口被占用与源码编译失败是两类问题。','ps -ef | head\npgrep -af rcssserver\nss -lun\ncommand -v curl\ncurl -I https://www.python.org/\ndf -h\nfree -h','pgrep -af 同时展示 PID 与命令行；ss -lun 查看监听 UDP 端口；curl -I 请求 HTTP 头。df 查看磁盘，free 查看内存。需要停止时，先抄下确认过的本次 PID，再输入 kill 实际编号；不要输入文字占位符 PID。','没有服务器时 pgrep 可以没有匹配。curl 超时先检查网络/代理，HTTP 错误先看状态，不要把下载的错误网页当安装包。某些系统上查看进程归属需额外权限，查看不到不代表端口空闲。','端口已被旧服务器占用，重新编译新客户端能解决吗？','通常不能。应先确认哪个进程监听端口，再关闭自己的旧服务器或按平台支持修改端口；编译并不会释放监听端口。',[linux,bash]),
L('环境变量、脚本、Git 与一次完整排错','把常用指令组合成可重复的工作方式。','环境变量是 shell 传给子进程的配置，export 使它可以被新启动的程序继承。source 在当前 shell 执行脚本；bash 在子 shell 中执行。Git clone 获取源码，status 看本地更改，rev-parse 记录源码版本。','printf "%s\\n" "$PATH"\nexport ROBOT_LAB="$HOME/terminal-lab"\ncd "$ROBOT_LAB"\nprintf \'export LAB_MODE=training\\n\' > env.sh\nsource env.sh\nprintf "%s\\n" "$LAB_MODE"\ngit --version','双引号允许 $变量 展开且保留空格；单引号按原文处理。写入 ~/.bashrc 的配置会影响以后 Bash 终端，因此理解之后只追加一次，修改前备份。ROS 的 source setup.bash 也是配置当前终端。','LAB_MODE 应输出 training。环境变量只在设置它的进程和后续子进程中生效，不能倒过来改变已经打开的另一窗口。','为什么在终端 A source ROS 后，终端 B 仍然找不到 ros2？','两个终端是不同 shell。B 需要单独 source；写入启动文件后也要重新加载或新开终端。排错顺序：当前系统→pwd→工具是否存在→依赖→版本→输出。',[bash,linux])
],mono,'完成这条路线后，再读安装教程中的路径、参数、环境变量与错误提示。'));

const pythonRun='Python 3.12 · 保存为 lesson.py 后在 Ubuntu 执行 python3 lesson.py';
const P=(title,goal,theory,example,explain,expected,task,answer,chapter='introduction')=>L(title,goal,theory,example,explain,expected,task,answer,[py(chapter)],pythonRun,'已完成 Python 第一课；每课是独立完整示例，除特别注明外保存在同一练习文件中运行。');
window.COURSES.push(T('python','Python 基础与面向对象','python','写出能解释的程序：从变量、函数到类、继承与一个完整小项目。',['Python 3.12','零基础编程','10 节递进'],[
L('安装解释器，运行第一个文件','分清终端、交互解释器和源代码文件。','Python 解释器执行 .py 文件。Ubuntu 24.04 自带的系统 Python 3.12 适合本路线；不要替换 /usr/bin/python3。Windows 可从 python.org 下载官方 Python，但 ROS 学习继续在 Ubuntu 中使用系统解释器。',[['Ubuntu · Bash','sudo apt update\nsudo apt install python3 python3-venv python3-pip\nmkdir -p ~/python-lab\ncd ~/python-lab\nnano lesson.py'],['Python · 写入 lesson.py','name = "Learner"\nprint("你好，" + name)'],['Ubuntu · Bash','python3 --version\npython3 lesson.py']],'nano 保存方式见 Linux 课。print 是函数，括号内是参数；name 是变量；引号包住字符串。终端中的 python3 lesson.py 是运行命令，不要把它写进 Python 源文件。','打印“你好，Learner”。SyntaxError 先查引号和中文符号；找不到文件先看 pwd。若在 >>> 提示符内输入 Bash 命令会报错，用 exit() 返回终端。','把 name 改为自己的昵称，预测并运行输出。','赋值改变变量指向的字符串，print 每次读取当前变量值；文件需先保存，执行的才是新内容。',[py('introduction'),['Python 官方下载','https://www.python.org/downloads/']]),
P('变量、类型、运算与输入','理解数值和文本的区别，处理单位和用户输入。','变量是名称与对象的绑定。int 是整数，float 是小数，str 是文本，bool 是真或假。= 是赋值，== 是比较；/ 得浮点结果，// 整除，% 求余。用 input 得到的总是字符串，要计算需显式转换。',`distance_mm = 250
distance_m = distance_mm / 1000
enabled = True
print(type(distance_mm).__name__)
print(f"目标距离：{distance_m:.3f} m")
text = input("输入轮次（整数）：")
round_number = int(text)
print(round_number + 1)`.replace(/^\+/gm,''),'f 字符串把花括号中的值嵌入文本，:.3f 保留三位小数。先除以 1000 把毫米换成米，避免机器人接口单位混淆。int(text) 不能转换任意文本，下一阶段会用异常处理输入错误。','输入 2 后依次能看到 int、0.250 m 和 3；输入 two 会产生 ValueError，这是类型转换失败而不是 Python 安装失败。','比较 0.1 + 0.2 == 0.3 的结果，解释为什么测量值不适合直接做严格相等判断。','浮点数是有限精度近似，通常应比较误差是否小于允许阈值，例如 abs(a-b) < 1e-6；实际容差取决于测量和任务精度。'),
P('条件与循环：让程序按情况工作','通过缩进、分支和重复处理一组观测。','if/elif/else 选择路径；for 遍历可迭代对象；range(3) 产生 0、1、2；while 在条件成立时重复。冒号后的代码块用一致的四个空格缩进。and/or/not 组合条件，break 提前退出，continue 跳过本轮。',`distances = [0.3, 0.08, 0.5]
for index, distance in enumerate(distances):
    if distance < 0:
        continue
    if distance <= 0.1:
        print(index, "到达")
    else:
        print(index, "未到达")
count = 0
while count < 2:
    print("检查", count)
    count += 1`.replace(/^\+/gm,''),'enumerate 同时提供下标与数值。<= 包含边界等于。count += 1 是更新循环变量，否则 while 可能永不结束。这里只练数据判断，并未给真实设备发送动作。','输出第 1 个下标的观测“到达”，另外两个“未到达”；随后打印检查 0、检查 1。IndentationError 检查空格，不要混入 Tab。','把到达阈值改为 0.3，预测哪些观测会到达。','0.3 和 0.08 都满足 <=0.3。边界值测试能发现 < 与 <= 的差异，写控制条件时尤其需要明确。','controlflow'),
P('列表、元组、字典与集合','用合适的数据结构组织位置、配置和去重信息。','列表可修改且有顺序；元组常用于固定组合；字典用键查值；集合用于去重和成员判断。序列下标从 0 开始，切片右端不包含在结果中。复制一个列表与给它增加另一个名字是不同操作。',`position = (0.1, 0.2, 0.3)
samples = [10, 20, 30]
samples.append(40)
copy_samples = samples.copy()
copy_samples[0] = 99
config = {"team": "Learner", "port": 6000}
print(position[2], samples[:2])
print(config.get("host", "localhost"))
print(sorted(set([2, 2, 1])))
print(samples[0], copy_samples[0])`.replace(/^\+/gm,''),'append 原地追加；copy 生成浅拷贝，嵌套对象仍可能共享。get 允许键不存在时使用默认值。set 不保证用于展示的排序，所以用 sorted 得到有序列表。','应得到 0.3 [10, 20]、localhost、[1, 2]、10 99。IndexError 表示索引越界；KeyError 表示直接索引了不存在的键。','若将 copy_samples = samples.copy() 改成 copy_samples = samples，最后一行是什么？','会是 99 99。两个名称指向同一个可变列表，通过其中一个修改元素，另一个看到的也是同一对象。','datastructures'),
P('函数、返回值、参数与作用域','将一次计算封装为可复用函数，并测试边界。','def 定义函数但不会立刻执行函数体；调用时传入参数，return 把结果交给调用者。print 只显示内容，不能代替返回值。局部变量通常只在函数内使用；用参数传入依赖，比读取不明确的全局变量更容易解释。',`def within_range(value, lower=0.0, upper=1.0):
    """判断 value 是否在闭区间内。"""
    return lower <= value <= upper

def mm_to_m(value):
    return value / 1000

print(mm_to_m(250))
print(within_range(0.5))
print(within_range(2.0, upper=3.0))
assert mm_to_m(1000) == 1.0`.replace(/^\+/gm,''),'默认参数允许省略输入；upper=3.0 是按名称传参。assert 验证期望，不是给真实硬件做安全保护的替代方案。函数内部创建的值若需要带出去，应 return。避免用可变列表作默认参数。','打印 0.25、True、True，assert 通过时没有额外输出。返回 None 常是忘记 return；NameError 查变量是否定义在可见作用域。','为 mm_to_m 写出 0、1000、-1000 三个输入的期望，并解释负数是否一定错误。','分别是 0.0、1.0、-1.0。坐标允许负方向，距离长度通常不应为负；函数要处理什么，应由明确的数据语义决定。','controlflow'),
P('模块与虚拟环境：管理自己的代码','理解 import，隔离普通 Python 项目依赖。','一个 .py 文件就是可导入模块。标准库随 Python 提供；第三方依赖通过 pip 安装。普通项目使用虚拟环境，ROS 的 apt 安装 rclpy 则优先使用兼容的系统 Python，不要不加区分地套用普通 venv。',[['Ubuntu · Bash','cd ~/python-lab\npython3 -m venv .venv\nsource .venv/bin/activate\npython -m pip --version'],['Python · 保存为 units.py','def mm_to_m(value):\n    return value / 1000'],['Python · 保存为 lesson.py','from units import mm_to_m\nimport math\n\nif __name__ == "__main__":\n    print(mm_to_m(150))\n    print(round(math.pi, 2))'],['Ubuntu · Bash','python lesson.py\ndeactivate']],'python -m 用这个解释器运行模块，减少 pip 与 python 对不上的情况。__name__ 守卫使演示只在直接运行时执行，被 import 时不执行。不要把文件命名为 json.py、math.py 或 rclpy.py，避免遮蔽库。','脚本打印 0.15 和 3.14。ModuleNotFoundError 先确认解释器路径和文件位置；externally-managed-environment 时不要 sudo pip，回到 venv 或 apt 管理方式。','为什么 from units import mm_to_m 不需要 pip install units？','units.py 就在当前项目目录，解释器能直接搜索到它。pip 安装解决的是外部包分发，不是让同目录模块互相可见。','modules'),
P('文件、JSON 与异常处理','保存可读配置，并对错误给出具体原因。','with 确保文件用完关闭；JSON 能保存字典、列表和基础类型，适合参数记录。try/except 只捕获你能够处理的具体异常；不要用空的 except 把真正问题全部吞掉。',`import json
from pathlib import Path

path = Path("practice-config.json")
data = {"team": "Learner", "samples": [0.1, 0.2]}
with path.open("w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

try:
    with path.open(encoding="utf-8") as file:
        loaded = json.load(file)
    print(loaded["team"])
except FileNotFoundError:
    print("配置文件不存在，请检查当前目录")
except json.JSONDecodeError as error:
    print(f"JSON 格式错误：第 {error.lineno} 行")`.replace(/^\+/gm,''),'w 模式会覆盖本课的配置文件，示例先写再读以保证独立可运行。Path 的相对路径仍从运行时工作目录算，不自动从源码文件位置算。编码显式写 utf-8。','生成格式化 JSON 并打印 Learner。要练错误分支，可先注释写入部分，再改文件为不合法 JSON。先读 traceback 最后一行的异常类型，再回看发生位置。','JSON 中最后一项多一个逗号会怎样？','json.load 会抛出 JSONDecodeError，程序进入对应 except，报告行号。应修复数据，而不是将错误内容当作空配置继续控制设备。','inputoutput'),
P('面向对象一：类、实例、属性与方法','把目标的状态和对它的操作放进同一个对象。','类是对象类型的定义，实例是具体对象。__init__ 初始化实例，self 是当前实例；实例方法通过 self 访问属性。每个对象自己的数据应存为实例属性，尤其不要把可变列表当共享的类属性使用。',`class Target:
    category = "practice"

    def __init__(self, name, x):
        self.name = name
        self.x = x
        self.history = []

    def move_to(self, x):
        self.history.append(self.x)
        self.x = x

a = Target("ball-A", 0.1)
b = Target("ball-B", 0.4)
a.move_to(0.2)
print(a.name, a.x, a.history)
print(b.name, b.x, b.history)`.replace(/^\+/gm,''),'Target(...) 创建实例并调用初始化；a.move_to(0.2) 会自动把 a 作为 self。category 是共享的类属性；name、x、history 在初始化中为每个实例建立。方法在这里仅修改数据，不控制设备。','两行分别是 ball-A 0.2 [0.1] 与 ball-B 0.4 []。忘写 self 会造成参数数量错误；没有先定义属性可能触发 AttributeError。','若把 history = [] 写在 class 内、__init__ 外，两实例是否仍独立？','那样列表由类共享，调用 a.history.append 也可能被 b 看到。将列表放在 self.history = [] 中才能为每次实例化创建独立列表。','classes'),
P('面向对象二：封装、继承、多态与组合','能解释 ROS Node 子类和普通设备对象之间的关系。','封装让修改状态经过明确入口；Python 的单下划线是内部使用约定，不是访问权限墙。继承表达“是一种”；组合表达“拥有一个”。多态意味着不同对象提供相同方法，调用方无需知道具体类。super() 可复用父类初始化。',`class Sensor:
    def __init__(self, name):
        self.name = name

    def read(self):
        raise NotImplementedError("子类应提供读数")

class FixedSensor(Sensor):
    def __init__(self, name, value):
        super().__init__(name)
        self._value = value

    @property
    def value(self):
        return self._value

    def read(self):
        return self.value

class Monitor:
    def __init__(self, sensor):
        self.sensor = sensor

    def report(self):
        return f"{self.sensor.name}: {self.sensor.read()}"

print(Monitor(FixedSensor("camera-depth", 0.25)).report())`.replace(/^\+/gm,''),'FixedSensor 是 Sensor 的子类，重写 read；Monitor 拥有一个 sensor，是组合。@property 将只读接口写成属性形式，没有 setter 时对 value 赋值会失败。这比从外部任意改内部状态更容易控制数据约束。','打印 camera-depth: 0.25。Python 允许对象提供相同 read 方法而不必继承同一基类；此例继承是为了清楚展示契约。','ROS 里的 class MyNode(Node) 是继承还是组合？节点里保存一个相机对象又是什么？','前者继承 Node 的通信能力；后者是组合。通常把传感器状态作为成员保存，不应为了“复用名称”滥用继承。','classes'),
P('综合练习：独立完成观测记录器','把类、函数、验证、JSON 和调试组成一个小程序。','下面的程序只记录教学观测，不读取相机、不连接硬件。先自行尝试：用类保存一组以米为单位的非负距离，拒绝非法数据，输出数量与平均值，再写入 JSON。之后再复制示例对照。',`import json
from pathlib import Path

class ObservationLog:
    def __init__(self):
        self.samples = []

    def add(self, value):
        if not isinstance(value, (int, float)) or isinstance(value, bool):
            raise TypeError("读数必须是数字")
        if value < 0:
            raise ValueError("距离不能为负数")
        self.samples.append(float(value))

    def summary(self):
        if not self.samples:
            return {"count": 0, "mean_m": None}
        return {"count": len(self.samples),
                "mean_m": sum(self.samples) / len(self.samples)}

log = ObservationLog()
for value in [0.1, 0.2, 0.3]:
    log.add(value)
result = log.summary()
print(result["count"], round(result["mean_m"], 3))
Path("observations.json").write_text(
    json.dumps(result, indent=2), encoding="utf-8")`.replace(/^\+/gm,''),'add 统一校验，summary 把统计逻辑封装并处理空列表；None 明确表示无平均值，不假造一个 0。bool 是 int 的子类，所以单独排除。浮点输出用 round 只做展示。真实数据还应检查 NaN/无穷值。','输出 3 0.2，并在当前目录生成 observations.json。练异常时将输入改为 -0.1 或字符串，观察具体报错；生产代码应在输入边界处理，而不是默默跳过。','增加 maximum_m 字段，并说明空数据时该返回什么。','非空时 max(self.samples)，空时 None。要保持同一份输出结构，便于下游读取。读者完成后再进入 ROS 的 Python 节点课，比较普通类与 Node 子类。','errors')
],mono,'你已经具备阅读 rclpy Node 子类、回调与参数逻辑的 Python 基础。'));
})();

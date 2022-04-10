---
title: JVM基础入门
date: 2020-11-10 22:15:44
permalink: /pages/114041/
sidebar: auto
categories:
  - 随笔
  - JVM
tags:
  - jvm
  - Java
---

## 关于Java

老生长谈，**Java**是一个什么事物，都有些什么样的特性呢？

> **[Java](https://zh.wikipedia.org/wiki/Java)**：**Java** 是一种广泛使用的计算机编程语言，拥有跨平台、面向对象、泛型编程的特性，广泛应用于企业级Web应用开发和移动应用开发。
>
> **Java** 编程语言的风格十分接近C++语言。继承了C++语言面向对象技术的核心，舍弃了容易引起错误的指针，以引用取代；移除了C++中的运算符重载和多重继承特性，用接口取代；增加垃圾回收器功能。在Java SE 1.5版本中引入了泛型编程、类型安全的枚举、不定长参数和自动装/拆箱特性。Sun微系统对 **Java语言** 的解释是：“**Java 编程语言是个简单、面向对象、分布式、解释性、健壮、安全与系统无关、可移植、高性能、多线程和动态的语言**”。
>
> **Java** 不同于一般的编译语言或解释型语言。它首先将源代码编译成字节码，再依赖各种不同平台上的虚拟机来解释执行字节码，从而具有“一次编写，到处运行”的跨平台特性。在早期 **JVM** 中，这在一定程度上降低了 **Java** 程序的运行效率。但在J2SE1.4.2发布后，**Java** 的运行速度有了大幅提升。

<!-- more -->

以上内容来自于维基百科，给定了 **Java** 一个明确的定义，但是对于Java平台以及特性并没有很好的归结，下面是我截取自极客时间**Java核心技术面试精讲**的部分内容：

> **Java** 本身是一种面向对象的语言，最显著的特性有两个方面，一是所谓的“书写一次，到处运行”（Write once, run anywhere），能够非常容易地获得跨平台能力；另外就是垃圾收集（GC, Garbage Collection），**Java** 通过垃圾收集器（Garbage Collector）回收分配内存，大部分情况下，程序员不需要自己操心内存的分配和回收。
>
> 我们日常会接触到 **JRE**（Java Runtime Environment）或者 **JDK**（Java Development Kit）。 **JRE**，也就是 **Java** 运行环境，包含了 **JVM** 和 **Java** 类库，以及一些模块等。而 **JDK** 可以看作是 **JRE** 的一个超集，提供了更多工具，比如编译器、各种诊断工具等。
>
> 对于“Java 是解释执行”这句话，这个说法不太准确。我们开发的 Java 的源代码，首先通过 Javac 编译成为字节码（bytecode），然后，在运行时，通过 Java 虚拟机（JVM）内嵌的解释器将字节码转换成为最终的机器码。但是常见的 JVM，比如我们大多数情况使用的 Oracle JDK 提供的 Hotspot JVM，都提供了 JIT（Just-In-Time）编译器，也就是通常所说的动态编译器，JIT 能够在运行时将热点代码编译成机器码，这种情况下部分热点代码就属于编译执行，而不是解释执行了。

在维基百科给出的定义中，提到 **Java** 编程语言是解释性的语言，而在Java核心技术面试精讲中提出该说法不太准确，我比较认可后者的看法。类似 JIT、AOT（Ahead-of-Time Compilation，在执行前直接将字节码编译成机器代码，静态编译） 技术的出现以及实践，使得 **Java** 的解释性变得不那么纯粹，此时从不同的角度可能会得到不同的结果，比如从占比上考虑，那么 **Java** 还是解释性的；如果从 JIT 的角度看，此刻的 **Java** 是编译性的；而从总体的角度来看，则是混合性的（解释和编译的混合）。

## 为什么要学习JVM

不仅要知其然，还要知其所以然。**Java** 语言对底层平台良好的封装性，让我们编码更加的简单，如不再需要自己管理内存。但是强大的封装同样会将其透明化，大部分时候不需要知道这透明墙的背后是什么，而当涉及透明墙后面的知识时，便会不知所措。当然，学习 **JVM** 不仅仅是获得遇到问题时解决问题的能力，还是更好的理解 **Java** 程序设计以及提升编码能力的不二法门（有的设计真的可以说是优美，且富有哲理）。

## Java字节码技术

### 什么是字节码

字节码（Java bytecode）：由单字节（byte）的指令组成，理论上最多支持256个操作码（opcode）。实际上 **Java** 只使用了200左右的操作码，还有一些操作码则保留给调试操作。

按照指令的性质，主要分为4个大类（其中2、3、4皆和 **Java** 语言相关）：

1. 栈操作指令，包括与局部变量交互的指令
2. 程序流程控制指令
3. 对象操作指令，包括方法调用指令
4. 算术运算以及类型转换指令

关于助记符，其实就是字节码操作码（二进制存储，目视解译难度也太高了）的可读性编码，主要就是提供开发人员对于字节码操作码的可读性，每个助记符都对应一个字节码操作码。

### 如何生成字节码

我们平时编写的基本上都是 **Java** 源码，也就是后缀为 **.java** 类型的文件，通过 JDK 中的编译工具 javac 就可以将源码编译为字节码（后缀为 **.class**）。如果在生成字节码之前，我们需要有一份符合 **Java** 语法规范的源码文件。

#### 源码准备

这里有一个简单的类，源码如下：

```java
package demo.jvm0104;

public class HelloByteCode {
    public static void main(String[] args) {
        HelloByteCode helloByteCode = new HelloByteCode();
    }
}
```

#### 生成字节码

```text
使用 javac命令进行编译，使用 javap 命令可查看字节码

javac HelloByteCode.java          # 在HelloByte.java的同级目录下执行
javap -c HelloByteCode.class      # 在HelloByte.class的同级目录下执行
```

```java
Compiled from "HelloByteCode.java"
public class demo.jvm0104.HelloByteCode {
  public demo.jvm0104.HelloByteCode();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: new           #2                  // class demo/jvm0104/HelloByteCode
       3: dup
       4: invokespecial #3                  // Method "<init>":()V
       7: astore_1
       8: return
}
```

如上所视，这是一个很简单的类编译后生成的字节码，这里看到的字节码本不完整，可以使用 javap -c -verbose HelloByteCode.class 查看更加详细的字节码内容。这里可以先简单的看一下字节码，此处显示的为字节码对应的助记符

- dup: 用于复制栈顶的值。由于构造函数调用不会返回值，所以如果没有 dup 指令，在对象上调用方法并初始化之后，操作数栈就会是空的，在初始化之后就会出问题，接下来的代码就无法对其进行处理

- aload_0：a表示引用（对象引用），类似于 aload_0 和 astore_0 为一对操作，栈操作，用于入栈与出栈，栈操作可用如下示意图表示：
![栈操作指令示意图](/jvm/frame/栈操作示意图（栈帧）.png)

在Java程序中，计算的行为都是发生在栈上面的，Load 和 Store 分别是在计算前从本地变量表中将变量加载至栈中，计算完成后将所得的变量值写回本地变量表。

### 字节码的运行时结构（栈帧结构）

栈帧结构示意图

![栈帧结构图](/jvm/frame/栈帧结构图.png)

JVM 是一台基于栈的计算机其，能够像计算机一样解读机器码（此处机器码类比为字节码），所以又将其称之为虚拟机。

在 Java 程序中，每个线程都有一个独属于自己的线程栈（JVM Stack），用于存储栈帧（Frame）。每一次的方法调用，JVM 都会自动创建一个栈帧并将其入栈。栈帧由操作数栈（Operand Stack）、本地变量表（Local Variable）以及一个 Class 引用组成。此处的 Class 引用指向当前方法在运行时常量池中对应的 Class。

### 字节码示例解读

在这里准备了一个涉及简单四则运算的程序

```java
package demo.jvm0104;

public class MovingAverage {

    private int count = 0;
    private double sum = 0.0D;

    public void submit(double value) {
        this.count ++;
        this.sum += value;
    }

    public double getAvg() {
        if (0 == this.count) {
            return sum;
        }
        return this.sum / this.count;
    }
}
```

```java
package demo.jvm0104;

public class LocalVariableTest {

    public static void main(String[] args) {
        MovingAverage movingAverage = new MovingAverage();
        int num1 = 1;
        int num2 = 2;
        movingAverage.submit(num1);
        movingAverage.submit(num2);
        double avg = movingAverage.getAvg();
    }
}
```

编译成字节码

```text
使用 javac命令进行编译，使用 javap 命令可查看字节码

javac demo/jvm0104/LocalVariableTest.java               # 在包结构最外层的同级目录（demo）下执行
javap -c -verbose demo/jvm0104/LocalVariableTest.class  # 在包结构最外层的同级目录（demo）下执行
```

```java
Classfile /home/zhoujian/Downloads/Git/java-000-repository/src/demo/jvm0104/LocalVariableTest.class
  Last modified Nov 10, 2020; size 434 bytes
  MD5 checksum ad14266d95e706aca83dea47e32fe139
  Compiled from "LocalVariableTest.java"
public class demo.jvm0104.LocalVariableTest
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #6                          // demo/jvm0104/LocalVariableTest
  super_class: #7                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 2, attributes: 1
Constant pool:
   #1 = Methodref          #7.#16         // java/lang/Object."<init>":()V
   #2 = Class              #17            // demo/jvm0104/MovingAverage
   #3 = Methodref          #2.#16         // demo/jvm0104/MovingAverage."<init>":()V
   #4 = Methodref          #2.#18         // demo/jvm0104/MovingAverage.submit:(D)V
   #5 = Methodref          #2.#19         // demo/jvm0104/MovingAverage.getAvg:()D
   #6 = Class              #20            // demo/jvm0104/LocalVariableTest
   #7 = Class              #21            // java/lang/Object
   #8 = Utf8               <init>
   #9 = Utf8               ()V
  #10 = Utf8               Code
  #11 = Utf8               LineNumberTable
  #12 = Utf8               main
  #13 = Utf8               ([Ljava/lang/String;)V
  #14 = Utf8               SourceFile
  #15 = Utf8               LocalVariableTest.java
  #16 = NameAndType        #8:#9          // "<init>":()V
  #17 = Utf8               demo/jvm0104/MovingAverage
  #18 = NameAndType        #22:#23        // submit:(D)V
  #19 = NameAndType        #24:#25        // getAvg:()D
  #20 = Utf8               demo/jvm0104/LocalVariableTest
  #21 = Utf8               java/lang/Object
  #22 = Utf8               submit
  #23 = Utf8               (D)V
  #24 = Utf8               getAvg
  #25 = Utf8               ()D
{
  public demo.jvm0104.LocalVariableTest();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 3: 0

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=3, locals=6, args_size=1
         0: new           #2                  // class demo/jvm0104/MovingAverage
         3: dup
         4: invokespecial #3                  // Method demo/jvm0104/MovingAverage."<init>":()V
         7: astore_1
         8: iconst_1
         9: istore_2
        10: iconst_2
        11: istore_3
        12: aload_1
        13: iload_2
        14: i2d
        15: invokevirtual #4                  // Method demo/jvm0104/MovingAverage.submit:(D)V
        18: aload_1
        19: iload_3
        20: i2d
        21: invokevirtual #4                  // Method demo/jvm0104/MovingAverage.submit:(D)V
        24: aload_1
        25: invokevirtual #5                  // Method demo/jvm0104/MovingAverage.getAvg:()D
        28: dstore        4
        30: return
      LineNumberTable:
        line 6: 0
        line 7: 8
        line 8: 10
        line 9: 12
        line 10: 18
        line 11: 24
        line 12: 30
}
SourceFile: "LocalVariableTest.java"
```

字节码含义说明：

- iconst_1: （如：int num = 1;）
  - i：int类型值
  - const：常量值
  - 1：表示该常量的实际数值

- iload_2：
  - i：int类型值
  - load：栈操作，将数据从本地变量表中加载至操作数栈
  - 2：对应本地变量表中的 slot 值，即槽位

- dstore 4：
  - d：double类型值
  - store：栈操作，将数据从操作数栈写回本地变量表
  - 4：对应本地变量表中的 slot 值

iload_2 和 dstore 4 都是栈操作字节码，只不过后者是在槽位大于3之后，以参数的方式跟在字节码指令后面，所以 iload_2 是连在一起写的，dstore 4 是分开写的。

- i2d：
  - i：int类型值
  - 2：表示类型转换（to），i2d 表示 int 类型值转换为 double 类型值
  - d：double类型值

> 字节码执行流程 --> 待补充

在算术操作与类型转换中，只存在4中数据类型，如下：

- int
- long
- float
- double

而在 Java 语言中，存在8大基本数据类型：byte（8bit）、short（16bit）、char（16bit）、boolean（8bit）、int（32bit）、long（64bit）、float（32bit）、double（64bit）。但是在字节码处理中，像 boolean、byte 都是使用 int 进行表示。也就是说，在字节码处理中，int 是最小单位，小于 32bit 的数值皆使用 int 表示。（所以这里也存在存储占用的情况，比如 byte 只需要1字节，却使用了4字节进行存储）

关于算术运算和类型转换操作，在将源码编译成字节码的过程中就已经完成了将相应的操作转换为对应的字节码指令，这样在具体执行的时候已经无关数据类型是什么了。（就不再需要每一次执行都计算前后类型是什么了，执行效率更高）

关于 int（32bit）和 long（64bit）类型的操作是否为原子操作问题，从理论上来看，这和 CPU 的总线带宽是存在直接关系的。32位的 CPU 其总线带宽就是 32bit，对于 long 类型的数据需要分为两次读取，理论上是存在原子问题的。而在64位的 CPU 上则不存在这样的问题。（即为原子操作）

在 JVM 中，一共存在5种数据类型，分别是 int、long、float、；double 以及对象引用（4种数据类型+对象引用），其中对象引用是无法参与算术计算，也不能同另外的4种数据类型进行相互转换。

---

这里准备了一个完整的循环控制的程序

```java
package demo.jvm0104;

public class ForLoopTest {

    private static int[] NUMBERS = {1, 6, 8};

    public static void main(String[] args) {
        MovingAverage movingAverage = new MovingAverage();
        for (int number : NUMBERS) {
            movingAverage.submit(number);
        }
        double avg = movingAverage.getAvg();
    }
}
```

生成字节码

```text
使用 javac命令进行编译，使用 javap 命令可查看字节码

javac demo/jvm0104/ForLoopTest.java               # 在包结构最外层的同级目录（demo）下执行
javap -c -verbose demo/jvm0104/ForLoopTest.class  # 在包结构最外层的同级目录（demo）下执行
```

```java
Classfile /home/zhoujian/Downloads/Git/java-000-repository/src/demo/jvm0104/ForLoopTest.class
  Last modified Nov 10, 2020; size 612 bytes
  MD5 checksum 2613b808dee182beb04e7130316d06c4
  Compiled from "ForLoopTest.java"
public class demo.jvm0104.ForLoopTest
  minor version: 0
  major version: 55
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #7                          // demo/jvm0104/ForLoopTest
  super_class: #8                         // java/lang/Object
  interfaces: 0, fields: 1, methods: 3, attributes: 1
Constant pool:
   #1 = Methodref          #8.#23         // java/lang/Object."<init>":()V
   #2 = Class              #24            // demo/jvm0104/MovingAverage
   #3 = Methodref          #2.#23         // demo/jvm0104/MovingAverage."<init>":()V
   #4 = Fieldref           #7.#25         // demo/jvm0104/ForLoopTest.NUMBERS:[I
   #5 = Methodref          #2.#26         // demo/jvm0104/MovingAverage.submit:(D)V
   #6 = Methodref          #2.#27         // demo/jvm0104/MovingAverage.getAvg:()D
   #7 = Class              #28            // demo/jvm0104/ForLoopTest
   #8 = Class              #29            // java/lang/Object
   #9 = Utf8               NUMBERS
  #10 = Utf8               [I
  #11 = Utf8               <init>
  #12 = Utf8               ()V
  #13 = Utf8               Code
  #14 = Utf8               LineNumberTable
  #15 = Utf8               main
  #16 = Utf8               ([Ljava/lang/String;)V
  #17 = Utf8               StackMapTable
  #18 = Class              #30            // "[Ljava/lang/String;"
  #19 = Class              #10            // "[I"
  #20 = Utf8               <clinit>
  #21 = Utf8               SourceFile
  #22 = Utf8               ForLoopTest.java
  #23 = NameAndType        #11:#12        // "<init>":()V
  #24 = Utf8               demo/jvm0104/MovingAverage
  #25 = NameAndType        #9:#10         // NUMBERS:[I
  #26 = NameAndType        #31:#32        // submit:(D)V
  #27 = NameAndType        #33:#34        // getAvg:()D
  #28 = Utf8               demo/jvm0104/ForLoopTest
  #29 = Utf8               java/lang/Object
  #30 = Utf8               [Ljava/lang/String;
  #31 = Utf8               submit
  #32 = Utf8               (D)V
  #33 = Utf8               getAvg
  #34 = Utf8               ()D
{
  public demo.jvm0104.ForLoopTest();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 3: 0

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=3, locals=6, args_size=1
         0: new           #2                  // class demo/jvm0104/MovingAverage
         3: dup
         4: invokespecial #3                  // Method demo/jvm0104/MovingAverage."<init>":()V
         7: astore_1
         8: getstatic     #4                  // Field NUMBERS:[I
        11: astore_2
        12: aload_2
        13: arraylength
        14: istore_3
        15: iconst_0
        16: istore        4
        18: iload         4
        20: iload_3
        21: if_icmpge     43
        24: aload_2
        25: iload         4
        27: iaload
        28: istore        5
        30: aload_1
        31: iload         5
        33: i2d
        34: invokevirtual #5                  // Method demo/jvm0104/MovingAverage.submit:(D)V
        37: iinc          4, 1
        40: goto          18
        43: aload_1
        44: invokevirtual #6                  // Method demo/jvm0104/MovingAverage.getAvg:()D
        47: dstore_2
        48: return
      LineNumberTable:
        line 8: 0
        line 9: 8
        line 10: 30
        line 9: 37
        line 12: 43
        line 13: 48
      StackMapTable: number_of_entries = 2
        frame_type = 255 /* full_frame */
          offset_delta = 18
          locals = [ class "[Ljava/lang/String;", class demo/jvm0104/MovingAverage, class "[I", int, int ]
          stack = []
        frame_type = 248 /* chop */
          offset_delta = 24

  static {};
    descriptor: ()V
    flags: (0x0008) ACC_STATIC
    Code:
      stack=4, locals=0, args_size=0
         0: iconst_3
         1: newarray       int
         3: dup
         4: iconst_0
         5: iconst_1
         6: iastore
         7: dup
         8: iconst_1
         9: bipush        6
        11: iastore
        12: dup
        13: iconst_2
        14: bipush        8
        16: iastore
        17: putstatic     #4                  // Field NUMBERS:[I
        20: return
      LineNumberTable:
        line 5: 0
}
SourceFile: "ForLoopTest.java"
```

字节码含义说明（程序流程控制指令）：

- 21: if_icmpge     43：
  - 21：指令索引，表示当前指令的索引从21开始
  - if：if，判断语句
  - cmp：比较
  - ge：great，比较大小，一个值是否大于或等于另外一个值
  - 43：指令索引，表示如果满足 if 条件，则跳转到索引为43的指令继续执行

- 37: iinc          4, 1：
  - 37：指令索引，表示当前指令的索引从37开始
  - inc：自增，参数 4, 1中的1表示自增步长为1，即每次自增1
  - i：int类型值

- 40: goto          18
  - 40：指令索引，表示当前指令的索引从40开始
  - goto：跳转指令
  - 18：指令索引，goto 18 表示跳转到索引为18的指令继续执行

> 字节码执行流程 --> 待补充

---

> 补充：方法调用指令

- invokestatic：用于调用某个类的静态方法，这是方法调用指令中最快的一个
- invokespecial：用于调用构造函数，但也可以用于调用同一个类中的 private 方法，以及可见的超类方法。（常用）
- invokevirtual：如果是具体类型的目标对象，invokevirtual 用于调用公共、受保护和 package 级别的私有方法。（常用，调用实例方法，基于类进行分派）
- invokeinterface：当通过接口引用来调用方法时，将会编译为 invokeinterface指令。
- invokedynamic：jdk7 新增加的指令，是实现“动态类型语言”（Dynamically Typed Language）支持而进行的升级改造，同时也是 jdk8以后支持 Lambda 表达式的实现基础。

关于 Java 源码、字节码、JVM 之间的关系的看法（仅做参考）：

- 源码：是具体业务和逻辑的体现，是抽象的

- 字节码：是经由源码编译后的，确定的执行指令集合

- JVM：执行平台，字节码的执行器，字节码的出现使得 JVM 较为无脑（少计算、直接反应、直接执行，比如类型转换），当然在 JVM 中也是存在计算的，比如热点探测、实时编译等

## JVM类加载器

### 类的生命周期（借鉴自极客时间Java进阶训练营）

![类的生命周期示意图](/jvm/classloader/类的生命周期示意图.jpg)

一个类在 JVM 里的生命周期有7个阶段，分别是加载（Loading）、验证（Verification）、准备（Preparation）、解析（Resolution）、初始化（Initialization）、使用（Using）、卸载（Unloading）。其中的前五个部分（加载、验证、准备、解析、初始化）统称为类加载，而验证、准备、解析三个部分统称为链接（Linking），也就是说类加载完整的包含了链接过程。下面我们就分别来说一下类加载的五个过程。

#### 加载

加载阶段也可以称为装载阶段。这个阶段主要的操作就是 --> 根据明确知道的 class 完全限定名，来获取二进制 classfile 格式的字节流（即根据地址找到 class 文件，可以是本地文件，也可以是网络文件）。如果找不到二进制表示形式，则会抛出 NoClassDefFound 错误。

在装载阶段并不会检查 classfile 的语法和格式。类加载的整个过程主要由 JVM 和 Java 的类加载系统共同完成，当然具体到 loading 阶段则是由 JVM 与某一个类加载器（java.lang.classLoader）协作完成。

#### 校验（验证）

链接过程的第一个阶段是校验，确保 class 文件里的字节流信息符合当前虚拟机的要求，不会危害虚拟机的安全。
校验过程检查 classfile 的语义，判断常量池中的符号，并执行类型检查，主要目的是判断字节码的合法性，比如 magic number，对版本号进行验证。这些检查过程中可能会抛出 VerifyError，ClassFormatError 或 UnsupportedClassVersionError。

因为 classfile 的验证是链接阶段的一部分，所以这个过程中可能需要加载其他类，在某个类的加载过程中，JVM 必须加载其所有的超类和接口。如果类层次结构有问题（例如，该类是自己的超类或接口，死循环了），则 JVM 将抛出 ClassCircularityError。而如果实现的接口并不是一个 interface，或者声明的超类是一个 interface，也会抛出 IncompatibleClassChangeError。

#### 准备

由上而下，现在进入准备阶段，这个阶段将会创建静态字段，并将其初始化为标准默认值（比如 null 或者 0），并分配方法表，即在方法区中分配这些变量所使用的内存空间。请注意，准备阶段并未执行任何 Java 代码。

> 例如： public static int i = 1;
>
> 在准备阶段 i 的值会被初始化为 0，在后面的类初始化阶段才会执行赋值为 1。
>
> 但是如果像下面这样使用 final 修饰静态常量，某些 JVM 的行为就不一样了：
>
> public static final int i = 1;
>
> 对于常量 i，在准备阶段就会被赋值为 1，其实这样还是比较 pizzle，例如其他语言（C#）有直接的关键字 const，让告诉编
> 译器在编译阶段就替换成常量，类似宏指令，更简单。

#### 解析

然后进入可选的解析符号引用阶段。也就是解析常量池，主要有以下四种：

- 类或接口的解析
- 字段解析
- 类方法解析
- 接口方法解析

简单来说就是我们编写的代码中，当一个变量引用某个对象的时候，这个引用在 .class 文件中是以符号引用的方式来存储的（相当于做了一个索引记录）。在解析阶段就需要将其解析并链接为直接引用（相当于指向实际对象）。如果有了直接引用，那引用的目标必定在堆中存在。

加载一个 class 时，需要加载其所有的 super 类和 super 接口

#### 初始化

JVM 规范明确规定，必须在类的首次“主动使用”时才能执行类的初始化。被初始化的过程包括执行：

- 类构造器方法
- static 静态变量赋值语句
- static 静态代码块

如果一个子类进行初始化会先对其父类进行初始化，以保证父类在子类之前进行初始化。所以必然先初始化过 java.lang.Object 类，因为所有的 Java 类都继承自 java.lang.Object。

> 只要我们尊重语言的语义，在执行下一步操作之前完成装载，那么链接和初始化这些步骤，如果出错就按照规定抛出相应的错误，类加载系统完成可以根据自己的策略，灵活地进行符号解析等链接过程。
>
> 为了提高性能，HotSpot JVM 通常要等到类初始化时才会去装载和链接类。因此如果 A 类引用了 B 类，那么加载 A 类并不一定会去加载 B 类（除非需要进行验证）。主动对 B 类执行第一条指令时才会导致 B 类的初始化，这就需要先完成对 B 类的装载和链接。

#### 示例说明（类加载顺序）

### 类的加载时机

### 类加载器实现

#### 三类加载器

#### 继承关系

#### 自定义类加载器

## JVM内存模型

### JVM内存模型图

### 程序计数器（Program Counter Register）

### 虚拟机栈（VM Stack）

### 本地方法栈（Native Stack）

### 堆（Heap）

### 非堆（Non-Heap）

### 直接内存

## JVM启动参数

### 基本介绍与分类

### 系统属性参数

### 运行模式参数

### 堆内存设置参数

### GC设置参数

### 分析诊断参数

### JavaAgent参数

## 参考

- 深入理解Java虚拟机（第二版）

- Java进阶训练营（极客时间）

- [深入拆解Java虚拟机](https://time.geekbang.org/column/article/11289)

- [Java核心技术面试精讲](https://time.geekbang.org/column/article/6845)

## 说明

    我不是在卖课

    本文大部分内容来源于极客时间以及网络博文节选，如有冒犯，我先向您道歉，另还请告知我进行处理，谢谢
    邮箱：thread_zhou@126.com

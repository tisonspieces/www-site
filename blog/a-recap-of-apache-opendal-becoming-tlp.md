---
date: 2024-02-07
slug: a-recap-of-apache-opendal-becoming-tlp
authors:
    name: tison
    title: Apache OpenDAL PMC Member, Champion
    url: https://github.com/tisonkun
    image_url: https://github.com/tisonkun.png
---

# A Recap of Apache OpenDAL™ becoming TLP

## What is Apache OpenDAL?

Apache OpenDAL is a data access layer provided in the form of a software library. It allows users to access data stored on various storage services simply and efficiently through a unified API. You can consider it as an improved implementation of an S3 SDK, or use the unified OpenDAL API to simplify the work of configuring and accessing different data storage services (such as S3, HDFS, GCS, Aliyun OSS, etc.).

OpenDAL is provided as a library, so there is no need to deploy additional services when using OpenDAL. The core of OpenDAL is written in Rust. During the project's incubation and growth, the community has also developed bindings for languages such as Java, Python, Node.js, and C, to support the convenient integration of OpenDAL capabilities into programs written in these languages.

The following diagram lists the users of Apache OpenDAL's multi-language implementations:

![Apache OpenDAL Users](assets/opendal-users.png)

You can use the unified APIs of OpenDAL as follows:

```rust
async fn do_business() -> Result<()> {
    let mut builder = services::S3::default();
    builder.bucket("test");

    let op = Operator::new(builder)?
        .layer(LoggingLayer::default())
        .finish();

    // Write Data
    op.write("hello.txt", "Hello, World!").await?;
    // Read Data
    let bytes = op.read("hello.txt").await?;
    // Fetch Metadata
    let meta = op.stat("hello.txt").await?;
    // Delete Data
    op.delete("hello.txt").await?;

    Ok(())
}
```

As you can see, the API for data reading and writing is carefully designed. Users wanting to access data stored on different services only need to modify the configuration of the Operator, without having to change any code for the actual read and write operations.

<!-- truncated -->

## The History of Apache OpenDAL

OpenDAL was initially created by [@Xuanwo](https://xuanwo.io/about/) at DatafuseLabs as a data access layer for the [Databend](https://databend.rs/) project. Prior to OpenDAL, Xuanwo had developed a similar software called BeyondStorage while at QingCloud. Unfortunately, [BeyondStorage eventually halted its development](https://xuanwo.io/en-us/2023/01-beyond-storage-why-we-failed/) for various reasons.

In contrast to the setbacks encountered by BeyondStorage, OpenDAL quickly flourished with a clear goal in mind:

- In December 2021, Xuanwo began developing the data access layer, which later became the core of OpenDAL, within the Databend codebase.
- In the same month, Xuanwo started drafting the positioning and goals of OpenDAL.
- On February 14, 2022, Valentine's Day, the code of OpenDAL was extracted from the Databend codebase and began operating as an independent open-source project.

In August 2022, Xuanwo reached out to me to explore the potential of OpenDAL joining the ASF Incubator.

At that time, the project had been in development for only about six months, predominantly crafted by Xuanwo himself, and had not yet been adopted outside Databend. I shared with Xuanwo [the podling proposal template](https://cwiki.apache.org/confluence/display/INCUBATOR/New+Podling+Proposal), provided guidance for project development, and advised focusing on user growth, active integration with other well-known software, creating demonstrative samples, and engaging developers through collaborative development opportunities.

:::note

Reviewing OpenDAL's commit history today, it appears that [GreptimeDB](https://github.com/GreptimeTeam/greptimedb/) had already begun exploring the adoption of OpenDAL at this time. Notably, contributions from GreptimeDB founders can be found in the releases of [v0.11.0](https://github.com/apache/opendal/releases/tag/v0.11.0) and [v0.11.4](https://github.com/apache/opendal/releases/tag/v0.11.4).

:::

In January 2023, just before the Chinese New Year, I was discussing with members of [Apache Kvrocks](https://kvrocks.apache.org/) about starting preparations for graduation after the new year. Recalling previous conversations with Xuanwo about OpenDAL's intention to enter the incubator, I pulled Xuanwo into drafting the incubation proposal, and we initiated the [proposal discussion](https://lists.apache.org/thread/px7wjcjy3rd4s59d4d3ll1x6y11d240r) in early February.

Thanks to the project's clear positioning and its potential to replace the fading [Apache jclouds](https://jclouds.apache.org/) project, the incubation proposal was ["unanimously passed"](https://lists.apache.org/thread/h76wsb582xjdph6p430vjq3oq26502bc).

:::info

The experiences during this period are further detailed in the following blog posts:

* [Way to Go: OpenDAL successfully entered the Apache Incubator](https://opendal.apache.org/blog/opendal-entered-apache-incubator/)
* [2023-07: Milestones](https://xuanwo.io/reports/2023-07/)

:::

Over the next year, the Apache OpenDAL community saw rapid development, achieving commendable results in various aspects such as feature development, version releases, and community growth:

![Apache OpenDAL Incubation Status](assets/opendal-incubation-status.png)

The picture above illustrates that during the incubation, OpenDAL welcomed 10 new Committers and 3 new PPMC members, with 8 different Release Managers publishing 11 releases that conformed to Apache standards.

Beyond what the picture shows, OpenDAL initiated and implemented 23 technical proposals, addressed over 1000 issue reports, and merged over 2000 patches during incubation.

As early as August 2023, I assessed that OpenDAL was nearing the criteria for graduation. In October 2023, after some discussions, one of the project mentors, Sheng Wu, created a [checklist](https://github.com/apache/opendal/issues/3283) of tasks that needed to be completed before graduation, officially initiating the graduation process.

![Apache OpenDAL Graduation TODOs](assets/opendal-graduation-todos.png)

The tasks on this checklist were not all straightforward and easy to understand for the OpenDAL PPMC, and many of them were quite challenging. As we delve into the challenges faced by OpenDAL in its graduation process later, you will see that some challenges were difficult to overcome. Thus, after completing some of the more understandable tasks, the list saw a standstill of four to five weeks with no progress.

By the end of November 2023, while preparing to initiate two new incubation proposals, I also decided to push forward with OpenDAL's graduation efforts to avoid the situation where tasks, theoretically achievable in one go, become dragged out and need to be restarted completely in the future.

In hindsight, through discussions with Xuanwo, I learned that developers generally felt unfamiliar with those tasks. Faced with many tasks that seemed daunting at first glance, their initial reaction was to subconsciously put them off. As a project mentor, I explained these tasks, which were somehow tinged with bureaucracy, in plain language to the PPMC members and broke them down into practical, executable tasks, moving the project towards graduation.

In December 2023, the OpenDAL project community internally [reached a consensus on graduation](https://lists.apache.org/thread/kq00ynqtbbwsh2n7485s5vypzjropck6). Subsequently, the graduation proposal was submitted for discussion to the ASF Incubator mailing list. After a month of discussion and continuous resolving issues, in January 2024, the project successfully [passed the graduation vote](https://lists.apache.org/thread/nxd3218gdnylp8g2w7jhcjktorthjydl) and was approved by the Board of Directors during the Board Meeting: **Apache OpenDAL officially became a top-level project of the ASF**.

## The Criteria of PMC Members

Under the ASF terminology, a PMC Member refers to a Project Management Committee member, roughly equivalent to a maintainer of an open-source project. All PMC Members are committers and can cast binding votes on project management issues.

During the incubation, a project also has a Project Management Committee, known as the Podling Project Management Committee (PPMC), with "Podling" indicating a project that is in incubation. The initial PPMC usually consists of the Initial Committers mentioned in the incubation proposal. This is followed by the nomination and voting process to invite new PPMC members.

At the time of graduation, the graduation proposal must specify who will compose the PMC of the new top-level project. Typically, it includes PPMC members and projects mentors. Moreover, committers invited during the incubation stage are potential candidates for membership.

:::note

There are always exceptions. For example, when Apache Doris graduated, some original PPMC members joined the StarRocks company (formerly "DorisDB" which violates ASF Trademark Policy) and continued to damage the Doris brand during the incubation. These members were not included in the PMC at graduation, and were even no longer committers of the top-level project.

:::

* [Have an agreement on the members of the PMC](https://lists.apache.org/thread/rzg7yb14cy2y3dw5twt7olgvy3whc814)

As I mentioned in the [_Maintainers Criteria_](https://www.tisonkun.org/2022/09/12/maintainer-criterions/) blog, I tend to give more privileges to community members who contribute, to reduce the barriers for their participation. Therefore, when initiating discussions on OpenDAL PMC members, I proposed an extreme permissive proposal to include all PPMC members and committers in the PMC.

This proposal was challenged by Xuanwo and other PPMC members. They believed that the idea of including committers in the PMC because of the graduation milestone was not feasible.

Later, Sheng Wu responded, stating that ASF culture advocates for actively bringing in committers and maintainers. Committers and PMC members have the same write permissions, but PMC members have additional responsibilities for project management, such as handling security issues, responding to the Board inquiries and demands, participating in releases and voting, and so on.

In subsequent discussions, OpenDAL PPMC members expressed a tendency to differentiate between PMC Members and committers, even leading to a hierarchical discourse. However, this is more a matter of expression and context.

:::note[[I mentioned on Twitter](https://twitter.com/tison1096/status/1730140534302498856)]

In the context of open-source propagation and advocacy in China, there is often a mindset of promoting members or even trading privileges off further engagements. Some even say that participating in open-source is like playing a game and leveling up.

It is normal to have different flavors of understanding about how open-source works, but the mindset above is indeed not the approach ASF advocates.

:::

Ultimately, OpenDAL adopted the approach of including members of the PPMC and project mentors and [asking all committers if they wished to participate in project management](https://lists.apache.org/thread/fzq7yzx4ty7f3vn3r8skby107vlzoy0h) as PMC Members. If a committer does not check the mailing list and respond to this email, they are clearly not interested in participating in project management affairs. Eventually, two committers responded to the email, and they have been actively involved in the project's development discussions and driving version releases recently.

Additionally, in the two months until the graduation process was completed, OpenDAL nominated one PPMC member following the usual process and criteria. Ultimately, Apache OpenDAL graduated as a top-level project with 14 PMC members: 4 initial members, 3 nominated during incubation, 2 added through polling, and 5 mentors.

From my personal perspective, community members who are willing to spend time as Release Manager or act as [Code Owners](https://github.com/apache/opendal/blob/main/.github/CODEOWNERS) should all be PMC members. By this criterion, the core developer of PyO3 and the original author of the OpenDAL Python binding, @messense, is not yet a PMC member, which is something that should be reviewed again.

## The Official Website and Documents

![Apache OpenDAL Homepage](assets/opendal-homepage.png)

The official website of OpenDAL is not quite "impressive". On one hand, this is because most of the core developers lack frontend development skills. On the other hand, as a software library integrated into applications, OpenDAL does not require a standalone deployment or a console for managing services, so there is no need for a dedicated page to showcase those aspects. In most cases, OpenDAL is used by calling its APIs within software.

In the homepage information displayed above, three main extension points are highlighted:

1. OpenDAL's core is a Rust library but provides bindings for multiple languages, allowing it to be called from programs written in various languages. Providing bindings for new languages is an extension point.
2. The core value of OpenDAL is to abstract different storage service backends, enabling users to access data from different locations using a unified API. Integrating new storage backends is an extension point.
3. OpenDAL has designed a `Layer` abstraction to provide different aspects of enhancement on the unified API access chain, including retry, logging, monitoring, timeouts, and other functionalities.

![Apache OpenDAL Docs](assets/opendal-docs.png)

The documentation navigation page displays almost all the content: the design philosophy of OpenDAL and how to configure the software libraries for the four officially released languages, with a link to the QuickStart page. The sidebar section titled "Services" is more of a reference manual for part of the supported storage backends than documentation.

The documentation on how to contribute to OpenDAL development and handle procedural work as a committer or PMC member is relatively comprehensive due to practical needs.

The remaining pages, such as the blog, have only published five articles so far. The API pages, except for the Rust documentation, mainly serve as reference manuals for the API documentation of other languages. The Downloads and ASF-related pages are mainly for compliance with ASF requirements and have little value for the project users.

In the graduation self-assessment checklist, project mentor Sheng Wu mentioned the issue of documentation, focusing on versioning the documentation and avoiding exposing documentation for unreleased bindings. In general, this suggestion is based on the standards of [Apache SkyWalking's multilingual SDK and multimodule documentation](https://skywalking.apache.org/docs/).

One of the OpenDAL PMC members, @suyanhanx, has conducted preliminary [research on versioning the documentation](https://github.com/apache/opendal/issues/3319) but has not completed it thoroughly. The development and release documentation has not been updated to include relevant operations.

I believe there is still significant room for improvement in OpenDAL's documentation. However, during the graduation check, I used the following criteria:

* The official website should be functional, and all links should be valid and ready when discussing related concepts.
* At the very least, it should provide enough information for people who want to use OpenDAL, with a clear reading journey for the entire content. As for versioning, since OpenDAL has not reached version 1.0, it can initially provide documentation for the nightly version, as that is the current usage by users.

In fact, detailed versioned documentation regarding the core design of OpenDAL and the usage of various service backends is already included in the [Rust core](https://opendal.apache.org/docs/rust/opendal/docs/index.html).

![Apache OpenDAL Rust Docs](assets/opendal-rust-docs.png)

In my opinion, the next steps for optimizing OpenDAL's documentation should focus on clarifying the definition of concepts, common design and usage patterns, and translation idioms between different languages. Under this premise, the actual documentation content can be linked to the living documentation accompanying the code in the Rust core, utilizing the comprehensive documentation present in the Rust API documentation.

The actual reading journey for users starts by referring to the documentation on design and usage patterns to determine which specific module's documentation they need to look for in the Rust API documentation. After understanding the corresponding interface contracts, they can then refer to the translation idioms of the interfaces in their preferred programming language to complete the development.

If this level of documentation can be achieved, from a software product perspective, OpenDAL can be considered "competitive".

## Develop and Distribute of Multilingual Bindings

As mentioned above, one of the key features of OpenDAL is its multilingual bindings, allowing the utilization of OpenDAL's capabilities written in various languages. This is also why OpenDAL can be considered a replacement for the jclouds library written in Java.

Currently, the officially released libraries for OpenDAL are as follows:

* [Rust Core](https://crates.io/crates/opendal): Native Rust library
* [Java Binding](https://github.com/apache/opendal/blob/main/bindings/java/README.md): Implemented using [jni-rs](https://github.com/jni-rs/jni-rs)
* [Python Binding](https://pypi.org/project/opendal/): Implemented using [PyO3](https://github.com/PyO3/pyo3)
* [Node.js Binding](https://www.npmjs.com/package/opendal): Implemented using [napi-rs](https://github.com/napi-rs/napi-rs)

The bindings for other languages that are still under development include:

* C
* C++
* .NET
* Golang
* Haskell
* Lua
* OCaml
* PHP
* Ruby
* Swift
* Zig

Among these, the C Binding has already been used in production environments, while the bindings for other languages have not been released yet or may only have a placeholder.

During the development of the language bindings, OpenDAL has summarized a set of best practices:

1. Develop a "Hello World" example roughly.
2. Refactor to establish basic engineering, compilation, and testing structures.
3. Refactor to design basic API mappings.
4. Ensure the corresponding release process for each language.

Among these steps, the most challenging part is the engineering aspect and understanding how to ultimately release to the target platform. Currently, the design and development of the C Binding are relatively mature, but due to the lack of a standardized release approach in the C ecosystem, the C Binding has not been officially released.

In contrast, languages like Rust, Python, and Node.js, which have a de-facto release platforms (central repository), allow OpenDAL to easily create corresponding GitHub Actions workflows for automated releases.

It is worth mentioning that although most Java libraries are published on Maven Central, the repository for ASF software is not the commonly used Sonatype repository but the ASF own repository. Considering that [Apache Maven](https://maven.apache.org/) is also an ASF project, this is not surprising. However, this means that supporting automatic releases for OpenDAL Java Binding requires the involvement of ASF INFRA. OpenDAL Java Binding is the second Java library supported by ASF for automatic releases and the first Java library to automatically release JNI native shared libraries. The related work includes:

* [Setup opendal-java project GitHub secrets for signing artifacts](https://issues.apache.org/jira/browse/INFRA-24880)
* [ci: automatic java binding release](https://github.com/apache/opendal/pull/2557)
* [docs: auto release maven artifacts](https://github.com/apache/opendal/pull/2729)
* [docs(release): describe how to close the Nexus staging repo](https://github.com/apache/opendal/pull/3125)

In addition, the OpenDAL PMC actively collaborates with ASF trademark officers to explore the possibility of releasing the OpenDAL NPM package under [the @apache scope](https://www.npmjs.com/org/apache).

* [Add Apache org account as the OpenDAL NPM package owner](https://issues.apache.org/jira/browse/INFRA-25325)

The progress of Jarek Potiuk from Apache Airflow in collaborating with the PyPI team to create an ASF account is closely monitored by the OpenDAL PMC. Once established, OpenDAL Python Binding will be integrated under this account.

* [Provide a trusted PyPI publisher capability for Python projects via INFRA](https://issues.apache.org/jira/browse/INFRA-24678)

You can see that OpenDAL takes releases seriously and has effectively improved the reliability of package releases through the mechanisms provided by the platform and collaboration with ASF INFRA.

Finally, ASF also attaches great importance to the software dependencies used by the released software in terms of technical compliance and whether they comply with the [ASF 3RD PARTY LICENSE POLICY](https://www.apache.org/legal/resolved.html). OpenDAL provides a DEPENDENCIES file for each released artifact to disclose this information. Additionally, since most language bindings are a wrapping layer of the Rust core library, OpenDAL developers strive to minimize unnecessary third-party dependencies to reduce compliance burdens when used downstream.

Technically, due to the need to integrate with multiple storage service backends and the vision of providing bindings for different languages, OpenDAL places great emphasis on code engineering.

By checking [OpenDAL's GitHub Actions workflows](https://github.com/apache/opendal/tree/main/.github/workflows), you can find that OpenDAL has developed a reusable testing framework, allowing any new language bindings or storage service backends to quickly have the existing test coverage. However, this is not unique, as SkyWalking, which also provides multi-language support and modular development, has developed the [SkyWalking Infra E2E testing framework](https://github.com/apache/skywalking-infra-e2e) suitable for its own situation.

As for language binding technology, Rust's native support for C FFI makes implementing C bindings very smooth. Most languages also provide integration methods for accessing C APIs, so C bindings can be used to generate bindings for other languages. This is also the implementation method for OpenDAL's Haskell, Lua, and Zig bindings.

In addition to these solutions that heavily utilize existing technologies, the aforementioned technologies such as jni-rs and napi-rs encapsulate a layer of interfaces that conform to Rust conventions on top of the existing C API integration methods. This allows the development process to only involve the Rust language and the target language of the bindings. PyO3 goes even further by developing a scaffolding for this development process, simplifying the packaging and configuration integration work. It can be said that this is the Rust ecosystem actively approaching the target language of the bindings. At the low-level technical level, communication still relies on the C ABI on both sides.

Therefore, all of these technologies can be classified under the FFI framework, and the main costs of cross-language communication arise from data copying and thread model synchronization. You can read the technical blog post, [_Interoperability between Rust and Java Programs with Asynchronous Interfaces_](https://www.tisonkun.org/2023/07/30/jnirs-async/), to learn about the practices OpenDAL has undertaken. I believe OpenDAL will be active on the forefront of deep integration between Rust and other languages. If someone in the ecosystem wants to improve the interoperability experience between Rust and a specific target language, it is worth trying out your ideas on OpenDAL.

## Policies, Bureaucracy, and Foundation Development

:::warning

This blog is translated by ChatGPT from my Chinese blog. The wording is under improved, so certain words misuse can exist, especially on praise and disparage.

:::

After we started the graduation discussion on the incubator mailing list, there was intense debate and continued handling of project issues for a month until a successful graduation.

The majority of the issues that needed to be addressed before graduation were actually included in the checklist provided by the project mentor, Sheng Wu, as we mentioned above. During the process of addressing the checklist, some time was spent on researching and discussing versioned document issues, dependency compliance issues, and the final selection of PMC members. The rest of the tasks were completed smoothly and step by step.

However, an important issue was overlooked in the checklist, which is that the PMC of ASF projects must adhere to the brand policy to protect the project's brand and the ASF brand. One of the fundamental requirements is to refer to the project using the formal name "Apache Foo".

The donation of OpenDAL did not involve a name change, so most materials and core project members still use the original name "OpenDAL" after the donation. They believe that since the project has been donated to ASF, the fact that the project belongs to ASF will be continuously reinforced over time, so they didn't pay much attention to it.

In reality, clear violations of the brand policy within ASF mainly involve cases like DorisDB directly using the brand for promotional purposes or commercial companies referring to their products as a certain project's commercial edition, and so on. Although OpenDAL originated from DatafuseLabs, it has no relationship with commercialization. Most of its core developers participate as individuals. Therefore, as long as everyone does not harm the ASF brand, I thought it should be fine.

However, IPMC Chair Justin Mclean does not share the same view. [He raised the challenge of the brand issue in the discussion of the OpenDAL graduation proposal](https://lists.apache.org/thread/3lwt4zkm1ovoskrz77y69pwntvn27xvs).

Looking back now, Justin's initial expression was actually "I found a few minor issues where some name and branding work needs to be done", and it wasn't very strong. But when Xuanwo's initial reply did not perfectly comply with ASF policies as Justin expected, he stated that the PMC should "have a good read of our branding policy".

Subsequently, with the PMC members unsure of what specific problem Justin was referring to, the project mentor, Sheng Wu, expressed a different opinion, which is similar to what I thought earlier. He stated that the OpenDAL project members had no motivation to harm the ASF brand, and the actual issues pointed out were not significant problems, just not "perfect".

Thus, Justin got the impression that the PMC disregarded the policies and had serious flaws in their subjective willingness to comply. As a result, he voted -1 on the graduation proposal.

This process brought a very unpleasant experience to the OpenDAL project members. It's not that one cannot vote -1, but after subjectively determining that the OpenDAL PMC did not cooperate and was unwilling to solve the problem, the continuous challenges were not aimed at solving concrete issues. Instead, they aimed to prove that the OpenDAL project members were a group of bad people. Even if the OpenDAL PMC members read the brand policy and made some improvements, they did not receive recognition and suggestions for further improvement. Instead, they kept receiving -1 criticism of "you haven't done well enough".

As a consequence, [the OpenDAL graduation proposal did not pass with a unanimous vote](https://lists.apache.org/thread/nxd3218gdnylp8g2w7jhcjktorthjydl).

:::note

This whole story is also an evidence that "Open Communications" in [The Apache Way](https://www.apache.org/theapacheway/) works well. We can check these public records and read them objectively.

:::

OpenDAL PMC kept working on understanding the policies and improving its compliance. I started a few discussions on the trademarks channel. In the end, we discovered that in reality, many top-level projects did not strictly adhere to the brand policy. Even some content released through official channels at the ASF foundation level, which should be "reviewed" according to the brand policy, may have imperfections.

However, this is not a reason for ASF project members to slack off. On the contrary, it reveals the vulnerability of ASF projects in terms of brand protection. The purpose of these discussions is not to argue right or wrong, but to reexamine the current implementation of the ASF brand policy with relevant personnel, so that we can evaluate the behavior of the OpenDAL PMC in dealing with brand policy issues over the past month and recent with a constructive perspective.

:::note

In the ASF Incubator, top-level projects are generally not considered as references. From a practical point of view, this is because many top-level projects are not fully compliant, which is the issue mentioned here.

However, I still insist that the practice of discussing top-level projects in the incubator should be maintained, at least for spreading and recognizing things they are doing well. For things that they are not doing well, the focus should not be limited to the scope of the Incubator, but should be approached from the perspective of the foundation to coordinate and resolve them.

This is because I am well aware that most open-source projects entering the Incubator are influenced by other top-level projects, and the object of incubation is to graduate and become a top-level project. If top-level projects are slacking off and not following the ASF policies, how can podlings understand the policy requirements they are expected to comply with?

:::

During the discussions, we identified various brand issues with OpenDAL and other top-level projects, and all known issues were actively resolved. These efforts were summarized and sent to the graduation proposal result discussion thread mentioned above.

I believe the following points are worth noting.

**The first one is about the way issues are addressed within the incubator.**

As an open-source community, the best way to address issues is by submitting patches to fix them and conveying your ideas in the process. At the very least, providing a reproducible bug report is better than simply saying, "I think you have a problem, you should find and fix it yourself". I used an analogy that if someone who has never been involved in project development or actually used the project comes along and says, "I feel like your code has some performance issues, you'd better test it yourself and make changes", this kind of vague report won't get the attention of the project maintainers.

This can be expressed as the following two comparisons:

* Helping us rather than failing us
* Correcting with contributions rather than instructions

**The second one is about the issue of policy documentation and implementation.**

ASF excels in having corresponding documentation for its community rules and practices:

- [The official website](https://apache.org/foundation/how-it-works/) records the foundation's goals, main definitions, responsibilities of various roles, and related policies such as release, branding, and voting.
- [The community development website](https://community.apache.org/) serves as a reference for best practices in policy application.
- [The Incubator website](https://incubator.apache.org/) includes guidelines for the entire incubation process.
- [The INFRA website](https://infra.apache.org/) explains the location and usage of foundation's infrastructure.

However, the content on these websites is somewhat outdated and need more maintenance.

The content on the foundation's official website is scattered and unless one is an experienced long-time member, it is difficult to quickly find the relevant materials.

The best practices on the community development website are mostly from over a decade ago. Despite claiming to be the most widely used maturity model in the open-source world, it does not mention a single word about the branding issues that were challenged in the graduation discussion.

Some of the "guidelines" on the Incubator website are not quite practical. Although they were discussed during the updates, most of the reviewers have not been involved in Incubation for quite a few time, making it difficult to have a concrete understanding of the issues that arise when implementing the guidelines.

The content on the INFRA website is also fragmented, and unless one is an experienced long-time member, it is difficult to quickly find the relevant materials. Moreover, in the past two decades, ASF has primarily released Java libraries on Maven Central and source code archives on SVN repositories, resulting in a significant gap in the release practices for different languages and software in the modern era.

On one hand, Apache OpenDAL has encountered Justin's recent challenges regarding branding issues. On the other hand, due to its multi-language and multi-platform ambitions for automated releases, it directly challenges the comfort zone of ASF INFRA, which has been in place for years. Therefore, compared to other projects, OpenDAL has had more interactions and time communicating with various ASF institutions during incubation and graduation.

This can also be a good thing. After all, only with the addition of fresh blood can the foundation continue to progress. As long as the challenges are properly guided and resolved through collaboration, encountering problems is not a terrifying thing.

**The third one is about the development of the foundation itself.**

Looking at it from another perspective, why does Justin vote -1 frequently within the incubator? In fact, this also reflects the issue of talent development within the incubator. Because too many people don't care about ASF policies and what form The Apache Way should take to build a community and release open-source software, these policy violations and cultural conflicts keep getting pushed to Justin to handle.

Over time, instead of making the effort to understand the history of project community development, who did what and why, the inherent laziness of human nature drives those with strict requirements to directly slap a -1 on the face and demand self-reflection. For me, I have enough motivation to address compliance and cultural issues. I believe that cooperation and resolving issues through discussion would be more effective. However, for certain projects, it is true that if you don't give them a -1, they won't pay attention to you, and there have been such cases.

At a higher level, the form of community development and incubation projects within ASF still follows a somewhat tribal-style approach. ASF originated from a group of developers, being in the same camp, coming together to form the Apache Group and continued the model of "a small group of people with a series of tribal knowledge running an open-source community".

:::note[Quote]

The ASF is well past the point where a small number of folks who have huge "tribal knowledge" can guide the number of projects and podlings that we now have.

:::

When discussing these issues, I have actively pushed for and resolved a series of missing documentation, facilitating the generation and summarization of best practices. I have also contemplated how we can effectively disseminate these policies, principles, and culture to a wider audience, enabling them to take on the responsibility of spreading them proactively. I believe that after 25 years, ASF should consider and improve upon these issues in the face of new open-source community dynamics and software development methodologies. In fact, this path is also a significant avenue for individuals who engage with Apache community concepts and methodologies through participation in ASF projects to grow into foundation members.

## References

Apache OpenDAL writes an official blog about its graduation. Check it out: https://opendal.apache.org/blog/apache-opendal-graduated.

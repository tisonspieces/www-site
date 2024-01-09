---
sidebar_label: How to set up project website?
tags:
  - howto
  - incubator
  - infra
---

# For Maintainers: Set up the project website

## How-to

After the [DNS setup](setup-podling.md#set-up-ldap-and-dns) has been done, the ASF provides `podling-name.apache.org` and `podling-name.incubator.apache.org` for your project.

To serving the project website at these domains, you need to add the following section in the `.asf.yaml` file under the repository you'd like to generate the static content:

```yaml
publish:
  whoami:  asf-site
```

The `.asf.yaml` file containing this section should be placed under the default branch and the deploy branch.

For example, [Apache Kvrocks](https://kvrocks.apache.org/) uses [apache/kvrocks-website](https://github.com/apache/kvrocks-website) repo for hosting the content of its project website. Both the `main` branch and the `asf-site` branch contains the `.asf.yaml` file with content as above.

## FAQs

### What repository is the site repo?

There is no convention, but any repo having an `.asf.yaml` file with `publish.whoami` property.

It works for any LDAP having only one repo matching this condition. If you have a more complex scenario, file a ticket on [ASF INFRA](https://issues.apache.org/jira/browse/INFRA) to discuss.

### Must the name of deploy branch be `asf-site`?

No. You can choose any name, but keep it consistent in the default branch and the deploy branch.

### Why does the site return 404 even I configure the `.asf.yml` file?

Please check once more the default branch and the deploy branch having the `.asf.yml` file with proper `publish.whoami` property set.

It's common that you configure the `.asf.yml` file in the default branch, but it isn't conveyed to the deploy branch.

### What should I do if I have more than one site to set up for different domain name?

Please file a ticket on [ASF INFRA](https://issues.apache.org/jira/browse/INFRA) to discuss and request. Here is an example:

* [How to publish gh-pages to rust.iceberg.a.o?](https://issues.apache.org/jira/browse/INFRA-25338)

## Reference

* [Guidelines for project websites](https://infra.apache.org/website-guidelines.html)
* [Managing your project website](https://infra.apache.org/project-site.html)
* [Website deployment service for Git repositories](https://cwiki.apache.org/confluence/display/INFRA/Git+-+.asf.yaml+features#Git.asf.yamlfeatures-WebsitedeploymentserviceforGitrepositories)

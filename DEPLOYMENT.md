# DNS Deployment Instructions: cecesdream.org

This document outlines the steps to transition the custom domain **cecesdream.org** from its current host (Canva) to the new GitHub-hosted marketing site.

## Phase 1: GitHub Repository Configuration

Before updating DNS records, you must prepare the repository to accept the custom domain.

1.  Navigate to the repository settings: [cecesdream.github.io Settings](https://github.com/cecesdream/cecesdream.github.io/settings/pages).
2.  In the **Custom domain** section, enter `cecesdream.org`.
3.  Click **Save**.
4.  *Note:* GitHub will automatically create a `CNAME` file in your repository. This is expected.

## Phase 2: DNS Provider Configuration

Log in to your domain registrar (e.g., Namecheap, GoDaddy, or wherever `cecesdream.org` is managed) and update the following records:

### 1. Update A Records (Apex Domain)
Remove any existing A records pointing to Canva and add the four GitHub Pages IP addresses:

| Type | Host | Value |
| :--- | :--- | :--- |
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

### 2. Update CNAME Record (Subdomain)
Ensure the `www` subdomain points to your GitHub Pages URL:

| Type | Host | Value |
| :--- | :--- | :--- |
| CNAME | www | `cecesdream.github.io` |

## Phase 3: Verification & SSL

1.  **Propagation**: DNS changes can take anywhere from a few minutes to 24 hours to propagate globally.
2.  **Enforce HTTPS**: Once the DNS records are verified by GitHub, return to the [Pages Settings](https://github.com/cecesdream/cecesdream.github.io/settings/pages).
3.  Check the box for **Enforce HTTPS**. (It may take a few minutes for the certificate to be issued).

> [!IMPORTANT]
> **Canva Cleanup**: Once propagation is complete, ensure you disconnect the domain from your Canva project to prevent any routing conflicts.

## Transition Checklist

- [ ] Repository: Custom domain saved to `cecesdream.org`
- [ ] DNS: 4 A records added (@)
- [ ] DNS: 1 CNAME record added (www)
- [ ] Verification: "DNS check successful" message in GitHub Settings
- [ ] Security: "Enforce HTTPS" toggled on

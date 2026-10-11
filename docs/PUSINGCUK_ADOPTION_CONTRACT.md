# Pusingcuk Adoption Contract — PUBLIC

**Status:** Proposed frontend/toolchain direction. No website code is declared converted by this document.

## Purpose

PUBLIC remains the visitor-facing website, discovery experience and inbound collaboration entry point. Pusingcuk is the intended shared language/compiler toolchain across PUBLIC, CORE and Founder-OS; it does not combine their responsibilities.

Canonical compiler roadmap: [Pusingcuk three-repository compiler roadmap](https://github.com/rllibo833-sudo/pusingcuk/blob/main/docs/THREE_REPO_COMPILER_ROADMAP.md).

## Candidate first use

JavaScript is a possible future backend for PUBLIC, but it is not yet a supported production target. Once the Pusingcuk IR and backend gates pass, evaluate a small pure helper or build-time content/route validation task before converting interactive website code.

## Keep unchanged initially

Do not start by rewriting the full website, authentication, deployment pipeline, server-side authorization, secret handling or CORE integrations. Preserve current website behavior and existing build/test paths until parity is demonstrated.

## Required gates

1. JavaScript backend explicitly declares its supported language subset.
2. Shared fixtures cover the selected behavior and execute against generated JavaScript.
3. Generated artifacts are included in the normal website build and tested.
4. Unsupported constructs fail during build with useful diagnostics.
5. Accessibility, Android-first behavior, performance and deployment checks remain green.
6. Only verified public-safe data is exposed; private CORE state and credentials never enter client bundles.
7. Existing implementation remains available for rollback until explicit Founder acceptance.

## Public truth boundary

The long-term Kawasan Masjid 1.000 Ha vision remains a vision, not a claim of physical implementation. PUBLIC content must continue to follow **No Proof, No Claim**. Adopting Pusingcuk must not alter the authority of CORE evidence or the Founder Gate.

This document introduces no new GitHub issue and does not authorize an automatic website rewrite or deployment.

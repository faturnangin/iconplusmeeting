<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter, useRoute } from 'vue-router';

import {
    CircleUser,
    Home,
    File,
    DoorOpen,
    PanelLeft,
    UsersRound,
    Briefcase
} from 'lucide-vue-next';

const colorMode = useColorMode();

const route = useRoute();


</script>

<template>
    <div class="flex flex-col w-full min-h-screen bg-muted/40">
        <aside class="fixed top-[68px] inset-y-0 left-0 z-10 flex-col hidden w-20 border-r bg-background sm:flex">
            <nav class="flex flex-col items-center gap-6 px-2 py-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <NuxtLink to="/"
                            class="flex items-center justify-center transition-colors rounded-lg hover:border h-9 w-9 md:h-8 md:w-8 hover:text-foreground"
                            exact-active-class="dark:bg-neutral-900 bg-neutral-100 text-foreground">
                                <Home class="w-5 h-5" />
                                <span class="sr-only">Dashboard</span>
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Dashboard
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger as-child>
                            <NuxtLink to="/form"
                            class="flex items-center justify-center transition-colors rounded-lg hover:border h-9 w-9 md:h-8 md:w-8 hover:text-foreground"
                            exact-active-class="dark:bg-neutral-900 bg-neutral-100 text-foreground">                              
                                <File class="w-5 h-5" />
                                <span class="sr-only">Form</span>
                            </NuxtLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Form
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                
            </nav>
        </aside>
        <div class="flex flex-col sm:gap-4 sm:pb-4">

            <header class="bg-gradient-to-r from-[#18A2BA] to-[#296377] sticky top-0 z-30 flex items-center justify-between h-[68px] gap-4 border-b dark:bg-none sm:border-0 px-6">
                <Sheet>
                    <SheetTrigger as-child>
                        <Button size="icon" variant="outline" class="sm:hidden">
                            <PanelLeft class="w-5 h-5" />
                            <span class="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="sm:max-w-xs">
                        <nav class="grid gap-6 text-lg font-medium">
                            <a href="#"
                                class="flex items-center justify-center w-10 h-10 gap-2 text-lg font-semibold rounded-full group shrink-0 bg-primary text-primary-foreground md:text-base">
                                <UsersRound class="w-5 h-5 transition-all group-hover:scale-110" />
                                <span class="sr-only">UsersRound</span>
                            </a>
                            <NuxtLink to="/" class="flex items-center gap-4 p-3 hover:border text-muted-foreground hover:text-foreground"
                            exact-active-class="rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white">
                                <Home class="w-5 h-5" />
                                Dashboard
                            </NuxtLink>
                            <NuxtLink to="/form" class="flex items-center gap-4 p-3 hover:border text-muted-foreground hover:text-foreground"
                            exact-active-class="rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white">
                                <File class="w-5 h-5" />
                                Form
                            </NuxtLink>
                        </nav>
                    </SheetContent>
                </Sheet>
                
                <img src="/images/imeeting.png" alt="Logo" width="129" height="52" />
                <div class="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" size="icon" class="rounded-full">
                                <Icon icon="radix-icons:moon"
                                    class="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
                                <Icon icon="radix-icons:sun"
                                    class="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
                                <span class="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem @click="colorMode.preference = 'light'">
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="colorMode.preference = 'dark'">
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="colorMode.preference = 'system'">
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" size="icon" class="rounded-full">
                                <CircleUser class="w-5 h-5" />
                                <span class="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem class="font-semibold text-rose-600">Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <main class="grid items-start flex-1 gap-4 p-4 sm:pl-24 sm:px-6 sm:py-0 md:gap-4">
                <slot />
            </main>
        </div>
    </div>
</template>